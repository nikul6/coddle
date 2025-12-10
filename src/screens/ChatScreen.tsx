import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useConsult } from '../context/ConsultContext';
import { ChatPhase } from '../state/chatMachine';
import { colors } from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Message = {
  id: string;
  from: 'user' | 'clinician';
  text: string;
};

export default function ChatScreen({ navigation }: Props) {
  const { concern, provider } = useConsult();

  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState<ChatPhase>(ChatPhase.WaitingClinicianFirst);
  const [inputValue, setInputValue] = useState('');

  const flatRef = useRef<FlatList>(null);
  const replyTimeout = useRef<NodeJS.Timeout | null>(null);
  const seeded = useRef(false);

  /** --------------------------------
   *  LOAD EXISTING CHAT SESSION
   *  -------------------------------- */
  useEffect(() => {
    const loadSession = async () => {
      const stored = await AsyncStorage.getItem('chatSession');

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.phase) setPhase(parsed.phase);

        seeded.current = true;
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true;

      const firstMsg: Message = {
        id: 'user-1',
        from: 'user',
        text: concern || '',
      };
      setMessages([firstMsg]);

      replyTimeout.current = setTimeout(() => {
        addClinicianMessage(`Thanks for sharing your concern about "${concern}". I have a few thoughts.`);
        setPhase(ChatPhase.AfterClinicianFirst);
      }, 1400);
    }

    return () => {
      if (replyTimeout.current) clearTimeout(replyTimeout.current);
    };
  }, [concern]);

  useEffect(() => {
    flatRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  useEffect(() => {
    AsyncStorage.setItem(
      'chatSession',
      JSON.stringify({
        messages,
        phase,
      })
    );
  }, [messages, phase]);

  useEffect(() => {
    if (phase === ChatPhase.Completed) {
      navigation.replace('Completion');
    }
  }, [phase]);

  const addClinicianMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `clin-${prev.length + 1}`,
        from: 'clinician',
        text,
      },
    ]);
  };

  const sendFollowUp = () => {
    if (!inputValue.trim() || inputLocked) return;

    const msg: Message = {
      id: `user-${messages.length + 1}`,
      from: 'user',
      text: inputValue.trim(),
    };

    setMessages(prev => [...prev, msg]);
    setInputValue('');
    setPhase(ChatPhase.WaitingClinicianSecond);

    replyTimeout.current = setTimeout(() => {
      addClinicianMessage(
        'Thank you for the information. Here are next steps and when to seek in-person care.'
      );
      setPhase(ChatPhase.Completed);
    }, 1500);
  };

  const inputLocked =
    phase === ChatPhase.WaitingClinicianFirst ||
    phase === ChatPhase.WaitingClinicianSecond ||
    phase === ChatPhase.Completed;

  const helperText = (() => {
    switch (phase) {
      case ChatPhase.WaitingClinicianFirst:
        return 'Waiting for clinician reply…';
      case ChatPhase.AfterClinicianFirst:
        return 'You can send one follow-up message.';
      case ChatPhase.WaitingClinicianSecond:
        return 'Follow-up sent. Waiting for clinician reply…';
      case ChatPhase.Completed:
        return 'Chat complete.';
    }
  })();

  /** render messages */
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.from === 'user';
    return (
      <View style={[styles.msgContainer, isUser ? styles.msgRight : styles.msgLeft]}>
        <View style={[styles.msgBubble, isUser ? styles.userBubble : styles.clinBubble]}>
          <Text style={styles.msgSender}>{isUser ? 'You' : provider.name}</Text>
          <Text style={styles.msgText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.gray700} style={styles.backButton} />
        </TouchableOpacity>

        {provider.avatarUrl && (
          <Image source={{ uri: provider.avatarUrl }} style={styles.avatar} />
        )}

        <View>
          <Text style={styles.headerName}>{provider.name}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.counterLabel}>Message</Text>
          <Text style={styles.counterValue}>
            {phase === ChatPhase.AfterClinicianFirst ? '1 of 2' : '2 of 2'}
          </Text>
        </View>
      </View>

      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      <Text style={styles.helper}>{helperText}</Text>

      {phase !== ChatPhase.Completed && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.inputWrap}>
            <TextInput
              style={[styles.input, inputLocked && styles.disabled]}
              value={inputValue}
              onChangeText={setInputValue}
              editable={!inputLocked}
              placeholder={
                phase === ChatPhase.AfterClinicianFirst
                  ? 'Type your follow-up…'
                  : 'Waiting for clinician…'
              }
              multiline
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                (!inputValue.trim() || inputLocked) && styles.sendDisabled,
              ]}
              disabled={!inputValue.trim() || inputLocked}
              onPress={sendFollowUp}
            >
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray50 },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backButton: { marginRight: 10 },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },

  headerName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray900,
  },
  headerStatus: {
    fontSize: 13,
    marginTop: 2,
    color: colors.success,
  },

  rightSection: { marginLeft: 'auto', alignItems: 'flex-end' },
  counterLabel: { fontSize: 12, color: colors.gray400 },
  counterValue: { fontSize: 15, fontWeight: '600', color: colors.gray700 },

  msgContainer: { marginBottom: 12 },
  msgLeft: { alignItems: 'flex-start' },
  msgRight: { alignItems: 'flex-end' },

  msgBubble: { maxWidth: '75%', padding: 12, borderRadius: 12 },
  userBubble: { backgroundColor: colors.primaryLight },
  clinBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },

  msgSender: { fontSize: 10, opacity: 0.8, marginBottom: 4, color: colors.gray700 },
  msgText: { fontSize: 14, color: colors.gray900 },

  helper: { textAlign: 'center', color: colors.gray600, marginBottom: 8 },

  inputWrap: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },

  input: {
    flex: 1,
    backgroundColor: colors.gray50,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  disabled: { opacity: 0.4 },

  sendBtn: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendDisabled: { backgroundColor: colors.gray300 },
});
