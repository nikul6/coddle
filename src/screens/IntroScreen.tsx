import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

export default function IntroScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="chatbubbles" size={48} color={colors.white} />
          </View>
          <Text style={styles.title}>Consult an Expert</Text>
          <Text style={styles.subtitle}>
            Get professional advice from certified healthcare providers
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, styles.chatCard]}
            onPress={() => navigation.navigate('ConcernSupport')}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <Ionicons name="chatbubble-ellipses" size={32} color={colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Chat Advice</Text>
            <Text style={styles.optionDescription}>
              Get written advice through secure messaging. Response within minutes.
            </Text>
            <View style={styles.ctaContainer}>
              <Text style={styles.ctaText}>Start Chat</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.videoCard]}
            onPress={() => navigation.navigate('ConcernSupport')}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <Ionicons name="videocam" size={32} color={colors.secondary} />
            </View>
            <Text style={styles.optionTitle}>Video Consult</Text>
            <Text style={styles.optionDescription}>
              Face-to-face consultation with a healthcare provider.
            </Text>
            <View style={styles.ctaContainer}>
              <Text style={[styles.ctaText, { color: colors.secondary }]}>Book Video</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.secondary} />
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chatCard: {
    borderWidth: 2,
    borderColor: colors.primaryLight + '40',
  },
  videoCard: {
    borderWidth: 2,
    borderColor: colors.secondaryLight + '40',
  },
  optionHeader: {
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 8,
  },
});
