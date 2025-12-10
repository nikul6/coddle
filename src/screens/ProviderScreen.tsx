import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useConsult } from '../context/ConsultContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Provider'>;

export default function ProviderScreen({ navigation }: Props) {
  const { provider, supportType } = useConsult();
  const [consent, setConsent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


  const handleConfirmPay = () => {
    if (consent) setShowPayment(true);
  };

  const handleConfirm = () => {
    if (!consent) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (supportType === 'chat') {
        navigation.replace('Chat');
      } else {
        navigation.replace('VideoWaitingRoom');
      }
    }, 1200);
  };

  if (showPayment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentCard}>
            <View style={styles.paymentIconContainer}>
              <Ionicons name="checkmark-circle" size={64} color={colors.success} />
            </View>
            <Text style={styles.paymentTitle}>Payment Processing</Text>
            <Text style={styles.paymentSubtitle}>Mock payment interface</Text>

            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Consultation Fee</Text>
                <Text style={styles.priceValue}>$49.00</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Service Fee</Text>
                <Text style={styles.priceValue}>$3.00</Text>
              </View>
              <View style={[styles.priceRow, styles.priceTotalRow]}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>$52.00</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
              disabled={isProcessing}
            >
              <Text style={styles.payButtonText}>{isProcessing ? 'Processing...' : 'Complete Payment (Mock)'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.gray700} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your Clinician</Text>

        <View style={styles.providerCard}>
          <View style={styles.providerHeader}>
            <Image
              source={{ uri: provider.avatarUrl }}
              style={styles.avatar}
            />
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.providerCredentials}>{provider.credentials}</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{provider.bio}</Text>
          </View>
        </View>

        <View style={styles.consentContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setConsent(!consent)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
              {consent && <Ionicons name="checkmark" size={18} color={colors.white} />}
            </View>
            <Text style={styles.consentText}>
              I consent to share my health information with {provider.name} for the
              purpose of this consultation. <Text style={styles.required}>*</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, !consent && styles.confirmButtonDisabled]}
          onPress={handleConfirmPay}
          disabled={!consent}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 24,
  },
  providerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  providerName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 4,
  },
  providerCredentials: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  bioContainer: {
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 16,
  },
  bioText: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 20,
  },
  consentContainer: {
    backgroundColor: colors.primaryLight + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray300,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  consentText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 20,
  },
  required: {
    color: colors.error,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  paymentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentIconContainer: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 8,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 32,
  },
  priceContainer: {
    width: '100%',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceTotalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray900,
  },
  priceTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray900,
  },
  priceTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
