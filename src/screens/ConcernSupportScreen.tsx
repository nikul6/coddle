import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, SupportType } from '../navigation/types';
import { useConsult } from '../context/ConsultContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'ConcernSupport'>;

export default function ConcernSupportScreen({ navigation }: Props) {
  const { concern, setConcern, supportType, setSupportType } = useConsult();
  const [localConcern, setLocalConcern] = useState(concern);

  const handleNext = () => {
    setConcern(localConcern.trim());
    navigation.navigate('Provider');
  };

  const chooseType = (type: SupportType) => setSupportType(type);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.gray700} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Tell us your concern</Text>

            <View style={styles.section}>
              <Text style={styles.label}>
                What brings you here today? <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                value={localConcern}
                onChangeText={setLocalConcern}
                placeholder="Describe your concern in detail..."
                placeholderTextColor={colors.gray400}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Choose consultation type</Text>

              <TouchableOpacity
                style={[
                  styles.typeCard,
                  supportType === 'chat' && styles.typeCardSelected,
                ]}
                onPress={() => chooseType('chat')}
                activeOpacity={0.7}
              >
                <View style={styles.typeCardContent}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={24}
                    color={supportType === 'chat' ? colors.primary : colors.gray400}
                  />
                  <Text style={[
                    styles.typeCardText,
                    supportType === 'chat' && styles.typeCardTextSelected,
                  ]}>
                    Chat Advice
                  </Text>
                </View>
                {supportType === 'chat' && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeCard,
                  supportType === 'video' && styles.typeCardSelectedVideo,
                ]}
                onPress={() => chooseType('video')}
                activeOpacity={0.7}
              >
                <View style={styles.typeCardContent}>
                  <Ionicons
                    name="videocam"
                    size={24}
                    color={supportType === 'video' ? colors.secondary : colors.gray400}
                  />
                  <Text style={[
                    styles.typeCardText,
                    supportType === 'video' && styles.typeCardTextSelectedVideo,
                  ]}>
                    Video Consult
                  </Text>
                </View>
                {supportType === 'video' && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.secondary} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                (!localConcern.trim() || !supportType) && styles.continueButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!localConcern.trim() || !supportType}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: colors.gray700,
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  textInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.gray900,
    minHeight: 120,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  typeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '10',
  },
  typeCardSelectedVideo: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondaryLight + '10',
  },
  typeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray700,
    marginLeft: 12,
  },
  typeCardTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  typeCardTextSelectedVideo: {
    color: colors.secondary,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
