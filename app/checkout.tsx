import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { currentUser } from '@/data/mockData';
import { ChevronDown, CreditCard, MapPin, Calendar, Clock, Check, Radio as RadioButton, Truck, Chrome as Home } from 'lucide-react-native';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'card' | 'paypal';

export default function CheckoutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  // States
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [selectedAddress, setSelectedAddress] = useState(currentUser.addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(currentUser.paymentMethods[0]);
  const [pickupDate, setPickupDate] = useState('Jeudi 22 Juin');
  const [pickupTime, setPickupTime] = useState('18:00 - 19:00');
  const [pickupLocation, setPickupLocation] = useState('Marché des Producteurs - Nice');
  const [note, setNote] = useState('');
  
  // Example cart summary data
  const cartSummary = {
    subtotal: 29.80,
    deliveryFee: deliveryMethod === 'delivery' ? 2.50 : 0,
    total: deliveryMethod === 'delivery' ? 32.30 : 29.80,
    items: 4
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to an API
    console.log('Order placed!');
    router.push('/order-confirmation');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Finaliser la commande" showBackButton />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Delivery Method */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Mode de livraison
          </Text>
          
          <View style={styles.deliveryOptions}>
            <TouchableOpacity 
              style={[
                styles.deliveryOption, 
                deliveryMethod === 'delivery' && 
                [styles.deliveryOptionActive, { borderColor: colors.primary }]
              ]}
              onPress={() => setDeliveryMethod('delivery')}
            >
              <View style={styles.deliveryOptionIcon}>
                <Truck 
                  size={24} 
                  color={deliveryMethod === 'delivery' ? colors.primary : colors.placeholder} 
                />
              </View>
              <View style={styles.deliveryOptionContent}>
                <Text 
                  style={[
                    styles.deliveryOptionTitle, 
                    { 
                      color: deliveryMethod === 'delivery' ? colors.primary : colors.text 
                    }
                  ]}
                >
                  Livraison à domicile
                </Text>
                <Text 
                  style={[
                    styles.deliveryOptionSubtitle, 
                    { color: colors.placeholder }
                  ]}
                >
                  Livraison sous 24-48h
                </Text>
              </View>
              {deliveryMethod === 'delivery' && (
                <View 
                  style={[
                    styles.deliveryOptionCheck, 
                    { backgroundColor: colors.primary }
                  ]}
                >
                  <Check size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.deliveryOption, 
                deliveryMethod === 'pickup' && 
                [styles.deliveryOptionActive, { borderColor: colors.primary }]
              ]}
              onPress={() => setDeliveryMethod('pickup')}
            >
              <View style={styles.deliveryOptionIcon}>
                <Home 
                  size={24} 
                  color={deliveryMethod === 'pickup' ? colors.primary : colors.placeholder} 
                />
              </View>
              <View style={styles.deliveryOptionContent}>
                <Text 
                  style={[
                    styles.deliveryOptionTitle, 
                    { 
                      color: deliveryMethod === 'pickup' ? colors.primary : colors.text 
                    }
                  ]}
                >
                  Retrait sur place
                </Text>
                <Text 
                  style={[
                    styles.deliveryOptionSubtitle, 
                    { color: colors.placeholder }
                  ]}
                >
                  Retrait gratuit
                </Text>
              </View>
              {deliveryMethod === 'pickup' && (
                <View 
                  style={[
                    styles.deliveryOptionCheck, 
                    { backgroundColor: colors.primary }
                  ]}
                >
                  <Check size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Delivery Address or Pickup Details */}
        {deliveryMethod === 'delivery' ? (
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Adresse de livraison
            </Text>
            
            {currentUser.addresses.map(address => (
              <TouchableOpacity 
                key={address.id}
                style={[
                  styles.addressCard, 
                  { 
                    backgroundColor: colors.card,
                    borderColor: selectedAddress.id === address.id ? colors.primary : colors.border 
                  }
                ]}
                onPress={() => setSelectedAddress(address)}
              >
                <View style={styles.addressCardContent}>
                  <View style={styles.addressIconContainer}>
                    <MapPin 
                      size={20} 
                      color={selectedAddress.id === address.id ? colors.primary : colors.placeholder} 
                    />
                  </View>
                  <View style={styles.addressTextContainer}>
                    <Text style={[styles.addressText, { color: colors.text }]}>
                      {address.street}
                    </Text>
                    <Text style={[styles.addressDetails, { color: colors.text }]}>
                      {address.zipCode} {address.city}
                    </Text>
                  </View>
                </View>
                
                {address.isDefault && (
                  <View 
                    style={[
                      styles.defaultBadge, 
                      { backgroundColor: colors.lightGray }
                    ]}
                  >
                    <Text 
                      style={[
                        styles.defaultBadgeText, 
                        { color: colors.placeholder }
                      ]}
                    >
                      Par défaut
                    </Text>
                  </View>
                )}
                
                {selectedAddress.id === address.id && (
                  <View 
                    style={[
                      styles.selectedCheck, 
                      { backgroundColor: colors.primary }
                    ]}
                  >
                    <Check size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={[
                styles.addButton, 
                { borderColor: colors.primary, borderStyle: 'dashed' }
              ]}
              onPress={() => router.push('/profile/addresses/new')}
            >
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                + Ajouter une nouvelle adresse
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Détails du retrait
            </Text>
            
            <View 
              style={[
                styles.pickupCard, 
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}
            >
              <View style={styles.pickupRow}>
                <MapPin size={20} color={colors.primary} />
                <View style={styles.pickupTextContainer}>
                  <Text style={[styles.pickupLabel, { color: colors.placeholder }]}>
                    Lieu de retrait
                  </Text>
                  <Text style={[styles.pickupValue, { color: colors.text }]}>
                    {pickupLocation}
                  </Text>
                </View>
              </View>
              
              <View style={styles.pickupRow}>
                <Calendar size={20} color={colors.primary} />
                <View style={styles.pickupTextContainer}>
                  <Text style={[styles.pickupLabel, { color: colors.placeholder }]}>
                    Date de retrait
                  </Text>
                  <Text style={[styles.pickupValue, { color: colors.text }]}>
                    {pickupDate}
                  </Text>
                </View>
                <ChevronDown size={16} color={colors.placeholder} />
              </View>
              
              <View style={styles.pickupRow}>
                <Clock size={20} color={colors.primary} />
                <View style={styles.pickupTextContainer}>
                  <Text style={[styles.pickupLabel, { color: colors.placeholder }]}>
                    Heure de retrait
                  </Text>
                  <Text style={[styles.pickupValue, { color: colors.text }]}>
                    {pickupTime}
                  </Text>
                </View>
                <ChevronDown size={16} color={colors.placeholder} />
              </View>
            </View>
          </View>
        )}
        
        {/* Payment Method */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Méthode de paiement
          </Text>
          
          {currentUser.paymentMethods.map(payment => (
            <TouchableOpacity 
              key={payment.id}
              style={[
                styles.paymentCard, 
                { 
                  backgroundColor: colors.card,
                  borderColor: selectedPayment.id === payment.id ? colors.primary : colors.border 
                }
              ]}
              onPress={() => setSelectedPayment(payment)}
            >
              <View style={styles.paymentCardContent}>
                <View style={styles.paymentIconContainer}>
                  {payment.type === 'card' ? (
                    <CreditCard size={20} color={selectedPayment.id === payment.id ? colors.primary : colors.placeholder} />
                  ) : (
                    <Text style={styles.paypalIcon}>P</Text>
                  )}
                </View>
                <View style={styles.paymentTextContainer}>
                  <Text style={[styles.paymentText, { color: colors.text }]}>
                    {payment.type === 'card' 
                      ? `${payment.cardType} •••• ${payment.lastFour}` 
                      : 'PayPal'
                    }
                  </Text>
                  {payment.isDefault && (
                    <Text style={[styles.paymentDefault, { color: colors.placeholder }]}>
                      Par défaut
                    </Text>
                  )}
                </View>
              </View>
              
              {selectedPayment.id === payment.id && (
                <View 
                  style={[
                    styles.selectedCheck, 
                    { backgroundColor: colors.primary }
                  ]}
                >
                  <Check size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={[
              styles.addButton, 
              { borderColor: colors.primary, borderStyle: 'dashed' }
            ]}
            onPress={() => router.push('/profile/payments/new')}
          >
            <Text style={[styles.addButtonText, { color: colors.primary }]}>
              + Ajouter un nouveau moyen de paiement
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Order Note */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Note de commande (optionnelle)
          </Text>
          
          <TextInput
            style={[
              styles.noteInput, 
              { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                color: colors.text
              }
            ]}
            placeholder="Instructions spéciales pour la commande..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
          />
        </View>
        
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Résumé de la commande
          </Text>
          
          <View 
            style={[
              styles.summaryCard, 
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
          >
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>
                Sous-total ({cartSummary.items} articles)
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {cartSummary.subtotal.toFixed(2)} €
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>
                Frais de livraison
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {cartSummary.deliveryFee > 0 
                  ? `${cartSummary.deliveryFee.toFixed(2)} €` 
                  : 'Gratuit'
                }
              </Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>
                {cartSummary.total.toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {/* Place Order Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.placeOrderButton, { backgroundColor: colors.primary }]}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderButtonText}>
            Passer la commande
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  deliveryOptions: {
    width: '100%',
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative',
  },
  deliveryOptionActive: {
    borderWidth: 2,
  },
  deliveryOptionIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryOptionContent: {
    flex: 1,
    marginLeft: 8,
  },
  deliveryOptionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  deliveryOptionSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  deliveryOptionCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  addressCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  addressDetails: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  defaultBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  selectedCheck: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  pickupCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickupTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  pickupLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  pickupValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  paymentCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paypalIcon: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#0070BA',
  },
  paymentTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  paymentText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  paymentDefault: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  placeOrderButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
});