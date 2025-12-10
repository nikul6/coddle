import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useConsult } from '../context/ConsultContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

export default function CompletionScreen({ navigation }: Props) {
  const { supportType, provider } = useConsult();

  const handleStartNewChat = async () => {
    await AsyncStorage.removeItem('chatSession');
    navigation.reset({
      index: 0,
      routes: [{ name: 'ConcernSupport' }],
    });
  };

  const handleBookVideo = async () => {
    await AsyncStorage.removeItem('chatSession');
    navigation.replace('VideoWaitingRoom');
  };

  const handleReturnHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Intro' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          </View>

          <Text style={styles.title}>
            {supportType === 'chat' ? 'Chat Complete' : 'Consultation Complete'}
          </Text>

          <Text style={styles.subtitle}>
            Thank you for using Coddle. Your consultation with {provider?.name} has been completed successfully.
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={colors.gray600} />
              <Text style={styles.infoText}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={colors.gray600} />
              <Text style={styles.infoText}>
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons
                name={supportType === 'chat' ? 'chatbubble-outline' : 'videocam-outline'}
                size={20}
                color={colors.gray600}
              />
              <Text style={styles.infoText}>
                {supportType === 'chat' ? 'Chat Consultation' : 'Video Consultation'}
              </Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartNewChat}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubble" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Start Another Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleBookVideo}
              activeOpacity={0.8}
            >
              <Ionicons name="videocam" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Book Video Consult</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textButton}
              onPress={handleReturnHome}
              activeOpacity={0.7}
            >
              <Text style={styles.textButtonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>How was your experience?</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.starButton}>
                  <Ionicons name="star-outline" size={32} color={colors.gray400} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.feedbackSubtext}>Tap to rate (mock)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.successLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray700,
    marginLeft: 12,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  textButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  textButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray600,
  },
  feedbackContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  starButton: {
    padding: 4,
  },
  feedbackSubtext: {
    fontSize: 12,
    color: colors.gray500,
  },
});
