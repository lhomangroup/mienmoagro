import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Check, MapPin, Calendar, Clock } from 'lucide-react-native';

export default function OrderConfirmationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  // Example order data - in a real app this would come from API or state management
  const orderData = {
    id: '1003',
    date: '21 juin 2023',
    items: 4,
    total: 32.30,
    deliveryMethod: 'delivery',
    deliveryAddress: '15 Rue des Oliviers, Nice, 06000',
    estimatedDelivery: '22-23 juin 2023'
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Animation */}
        <View style={styles.successContainer}>
          <View style={[styles.checkCircle, { backgroundColor: colors.success }]}>
            <Check size={40} color="white" strokeWidth={3} />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>
            Commande confirmée !
          </Text>
          <Text style={[styles.successSubtitle, { color: colors.placeholder }]}>
            Votre commande a été placée avec succès
          </Text>
        </View>
        
        {/* Order Summary */}
        <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={[styles.orderIdLabel, { color: colors.placeholder }]}>
                Numéro de commande
              </Text>
              <Text style={[styles.orderId, { color: colors.text }]}>
                #{orderData.id}
              </Text>
            </View>
            <View>
              <Text style={[styles.orderDateLabel, { color: colors.placeholder }]}>
                Date
              </Text>
              <Text style={[styles.orderDate, { color: colors.text }]}>
                {orderData.date}
              </Text>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.orderDetails}>
            <View style={styles.orderDetailRow}>
              <Text style={[styles.orderDetailLabel, { color: colors.placeholder }]}>
                Articles
              </Text>
              <Text style={[styles.orderDetailValue, { color: colors.text }]}>
                {orderData.items}
              </Text>
            </View>
            
            <View style={styles.orderDetailRow}>
              <Text style={[styles.orderDetailLabel, { color: colors.placeholder }]}>
                Total
              </Text>
              <Text style={[styles.orderDetailValue, { color: colors.primary }]}>
                {orderData.total.toFixed(2)} €
              </Text>
            </View>
            
            <View style={styles.orderDetailRow}>
              <Text style={[styles.orderDetailLabel, { color: colors.placeholder }]}>
                Mode de livraison
              </Text>
              <Text style={[styles.orderDetailValue, { color: colors.text }]}>
                {orderData.deliveryMethod === 'delivery' ? 'Livraison' : 'Retrait'}
              </Text>
            </View>
            
            {orderData.deliveryMethod === 'delivery' ? (
              <>
                <View style={styles.deliveryInfo}>
                  <MapPin size={18} color={colors.primary} style={styles.deliveryIcon} />
                  <View>
                    <Text style={[styles.deliveryAddressLabel, { color: colors.placeholder }]}>
                      Adresse de livraison
                    </Text>
                    <Text style={[styles.deliveryAddress, { color: colors.text }]}>
                      {orderData.deliveryAddress}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.deliveryInfo}>
                  <Calendar size={18} color={colors.primary} style={styles.deliveryIcon} />
                  <View>
                    <Text style={[styles.deliveryAddressLabel, { color: colors.placeholder }]}>
                      Livraison estimée
                    </Text>
                    <Text style={[styles.deliveryAddress, { color: colors.text }]}>
                      {orderData.estimatedDelivery}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.deliveryInfo}>
                  <MapPin size={18} color={colors.primary} style={styles.deliveryIcon} />
                  <View>
                    <Text style={[styles.deliveryAddressLabel, { color: colors.placeholder }]}>
                      Lieu de retrait
                    </Text>
                    <Text style={[styles.deliveryAddress, { color: colors.text }]}>
                      Marché des Producteurs - Nice
                    </Text>
                  </View>
                </View>
                
                <View style={styles.pickupTimeContainer}>
                  <View style={styles.deliveryInfo}>
                    <Calendar size={18} color={colors.primary} style={styles.deliveryIcon} />
                    <View>
                      <Text style={[styles.deliveryAddressLabel, { color: colors.placeholder }]}>
                        Date de retrait
                      </Text>
                      <Text style={[styles.deliveryAddress, { color: colors.text }]}>
                        Jeudi 22 Juin
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.deliveryInfo}>
                    <Clock size={18} color={colors.primary} style={styles.deliveryIcon} />
                    <View>
                      <Text style={[styles.deliveryAddressLabel, { color: colors.placeholder }]}>
                        Heure de retrait
                      </Text>
                      <Text style={[styles.deliveryAddress, { color: colors.text }]}>
                        18:00 - 19:00
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        
        {/* Email Receipt Notice */}
        <View style={[styles.emailCard, { backgroundColor: colors.lightGray }]}>
          <Text style={[styles.emailText, { color: colors.text }]}>
            Nous vous avons envoyé un récapitulatif de commande à{' '}
            <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{currentUser.email}</Text>
          </Text>
        </View>
        
        {/* Producer Image */}
        <View style={styles.producerContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg' }}
            style={styles.producerImage}
          />
          <View style={styles.producerContent}>
            <Text style={[styles.producerHeading, { color: colors.text }]}>
              Merci de soutenir les producteurs locaux !
            </Text>
            <Text style={[styles.producerText, { color: colors.placeholder }]}>
              Votre achat aide directement les producteurs et artisans de votre région.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.buttonSecondary, { borderColor: colors.primary }]}
          onPress={() => router.push(`/order/${orderData.id}`)}
        >
          <Text style={[styles.buttonSecondaryText, { color: colors.primary }]}>
            Détails de la commande
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.buttonPrimary, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonPrimaryText}>
            Continuer les achats
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Import user data for email display
import { currentUser } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 60,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderIdLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  orderDateLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
    textAlign: 'right',
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  orderDetails: {
    marginBottom: 8,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  orderDetailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  deliveryInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  deliveryIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  deliveryAddressLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  deliveryAddress: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  pickupTimeContainer: {
    marginBottom: 8,
  },
  emailCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  producerContainer: {
    marginBottom: 24,
  },
  producerImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
  },
  producerContent: {
    alignItems: 'center',
  },
  producerHeading: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  producerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  buttonsContainer: {
    padding: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSecondary: {
    flex: 1,
    marginRight: 8,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonSecondaryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  buttonPrimary: {
    flex: 1,
    marginLeft: 8,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimaryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});