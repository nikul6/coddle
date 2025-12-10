import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useConsult } from '../context/ConsultContext';
import { colors } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoWaitingRoom'>;

export default function VideoWaitingRoomScreen({ navigation }: Props) {
  const { provider, setSupportType } = useConsult();

  const Complete = () => {
    setSupportType('video');
    navigation.replace('Completion');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSpace} />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="videocam" size={76} color={colors.secondary} />
        </View>

        <Text style={styles.title}>Video Waiting Room</Text>
        <Text style={styles.subtitle}>
          {provider.name} will join your call shortly.
        </Text>

        <View style={styles.videoPreview}>
          <View style={styles.cameraGlass}>
            <Ionicons name="camera" size={90} color={colors.gray400} />
          </View>
          <Text style={styles.previewLabel}>Preview (mock)</Text>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="mic-off" size={22} color={colors.gray100} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="videocam-off" size={22} color={colors.gray100} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.endCallButton}
              onPress={Complete}
            >
              <Ionicons name="call" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={Complete}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip to completion (Dev)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E13'
  },
  headerSpace: {
    height: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: colors.secondaryLight + '33',
    padding: 24,
    borderRadius: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  videoPreview: {
    width: '100%',
    marginBottom: 50,
  },
  cameraGlass: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewLabel: {
    textAlign: 'center',
    color: colors.gray400,
    fontSize: 13,
    marginTop: 8,
  },
  bottomPanel: {
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipText: {
    color: colors.primary,
    fontSize: 14,
    opacity: 0.8,
  },
});
