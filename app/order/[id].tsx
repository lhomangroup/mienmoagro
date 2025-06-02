import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { currentUser } from '@/data/mockData';
import { MapPin, Calendar, Clock, Package, Check, Truck as TruckIcon, ShoppingBag } from 'lucide-react-native';
import OrderItemCard from '@/components/OrderItemCard';

export default function OrderDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Find the order from the user's orders
  const order = currentUser.orders.find(order => order.id === id) || currentUser.orders[0];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return colors.success;
      case 'processing':
        return colors.accent;
      case 'confirmed':
        return colors.primary;
      case 'cancelled':
        return colors.error;
      case 'ready':
        return colors.success;
      default:
        return colors.primary;
    }
  };

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed':
        return 'Livré';
      case 'processing':
        return 'En préparation';
      case 'confirmed':
        return 'Confirmé';
      case 'cancelled':
        return 'Annulé';
      case 'ready':
        return 'Prêt à être retiré';
      default:
        return 'En attente';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Détails de la commande" showBackButton />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Order Info Card */}
        <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={[styles.orderNumber, { color: colors.text }]}>
                Commande #{order.id.slice(-4)}
              </Text>
              <Text style={[styles.orderDate, { color: colors.placeholder }]}>
                Passée le {order.date}
              </Text>
            </View>
            
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: getStatusColor(order.status) }
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(order.status)}
              </Text>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          {order.deliveryMethod === 'delivery' ? (
            <View style={styles.deliveryInfo}>
              <TruckIcon size={20} color={colors.primary} style={styles.infoIcon} />
              <View>
                <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                  Adresse de livraison
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {order.deliveryAddress}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.deliveryInfo}>
                <Package size={20} color={colors.primary} style={styles.infoIcon} />
                <View>
                  <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                    Retrait au point de vente
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {order.pickupLocation}
                  </Text>
                </View>
              </View>
              
              <View style={styles.pickupTimeRow}>
                <View style={styles.pickupTimeItem}>
                  <Calendar size={16} color={colors.primary} style={styles.timeIcon} />
                  <Text style={[styles.timeText, { color: colors.text }]}>
                    {order.pickupTime?.split(' ')[0]}
                  </Text>
                </View>
                
                <View style={styles.pickupTimeItem}>
                  <Clock size={16} color={colors.primary} style={styles.timeIcon} />
                  <Text style={[styles.timeText, { color: colors.text }]}>
                    {order.pickupTime?.split(' ')[1]}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
        
        {/* Order Status Tracker */}
        {order.status !== 'cancelled' && (
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Statut de la commande
            </Text>
            
            <View style={styles.progressTracker}>
              <View 
                style={[
                  styles.progressLine, 
                  { 
                    backgroundColor: colors.border,
                    // Different levels of completion based on status
                    width: order.status === 'confirmed' ? '25%' : 
                          order.status === 'processing' ? '50%' :
                          order.status === 'ready' ? '75%' :
                          order.status === 'completed' ? '100%' : '0%',
                    backgroundColor: colors.primary
                  }
                ]} 
              />
              
              <View style={styles.stepsContainer}>
                <View style={styles.step}>
                  <View 
                    style={[
                      styles.stepCircle, 
                      { 
                        backgroundColor: 
                          ['confirmed', 'processing', 'ready', 'completed'].includes(order.status) 
                            ? colors.primary 
                            : colors.background,
                        borderColor: colors.primary
                      }
                    ]}
                  >
                    {['confirmed', 'processing', 'ready', 'completed'].includes(order.status) && (
                      <Check size={12} color="white" />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.stepText, 
                      { 
                        color: ['confirmed', 'processing', 'ready', 'completed'].includes(order.status) 
                          ? colors.primary 
                          : colors.placeholder
                      }
                    ]}
                  >
                    Confirmée
                  </Text>
                </View>
                
                <View style={styles.step}>
                  <View 
                    style={[
                      styles.stepCircle, 
                      { 
                        backgroundColor: 
                          ['processing', 'ready', 'completed'].includes(order.status) 
                            ? colors.primary 
                            : colors.background,
                        borderColor: colors.primary
                      }
                    ]}
                  >
                    {['processing', 'ready', 'completed'].includes(order.status) && (
                      <Check size={12} color="white" />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.stepText, 
                      { 
                        color: ['processing', 'ready', 'completed'].includes(order.status) 
                          ? colors.primary 
                          : colors.placeholder 
                      }
                    ]}
                  >
                    En préparation
                  </Text>
                </View>
                
                <View style={styles.step}>
                  <View 
                    style={[
                      styles.stepCircle, 
                      { 
                        backgroundColor: 
                          ['ready', 'completed'].includes(order.status) 
                            ? colors.primary 
                            : colors.background,
                        borderColor: colors.primary
                      }
                    ]}
                  >
                    {['ready', 'completed'].includes(order.status) && (
                      <Check size={12} color="white" />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.stepText, 
                      { 
                        color: ['ready', 'completed'].includes(order.status) 
                          ? colors.primary 
                          : colors.placeholder
                      }
                    ]}
                  >
                    {order.deliveryMethod === 'delivery' ? 'Expédiée' : 'Prête'}
                  </Text>
                </View>
                
                <View style={styles.step}>
                  <View 
                    style={[
                      styles.stepCircle, 
                      { 
                        backgroundColor: 
                          order.status === 'completed'
                            ? colors.primary 
                            : colors.background,
                        borderColor: colors.primary
                      }
                    ]}
                  >
                    {order.status === 'completed' && (
                      <Check size={12} color="white" />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.stepText, 
                      { 
                        color: order.status === 'completed'
                          ? colors.primary 
                          : colors.placeholder
                      }
                    ]}
                  >
                    {order.deliveryMethod === 'delivery' ? 'Livrée' : 'Récupérée'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Order Items */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Articles ({order.items.length})
          </Text>
          
          {order.items.map((item, index) => (
            <OrderItemCard 
              key={index}
              item={item}
              onPress={() => router.push(`/product/${item.product.id}`)}
            />
          ))}
        </View>
        
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Résumé du paiement
          </Text>
          
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>
                Sous-total
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {(order.total - 2.50).toFixed(2)} €
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>
                Frais de livraison
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {order.deliveryMethod === 'delivery' ? '2.50 €' : 'Gratuit'}
              </Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>
                {order.total.toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>
        
        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/search')}
          >
            <ShoppingBag size={18} color="white" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>
              Commander à nouveau
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.supportButton, { borderColor: colors.border }]}
            onPress={() => router.push('/support')}
          >
            <Text style={[styles.supportButtonText, { color: colors.text }]}>
              Besoin d'aide ?
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  orderCard: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
  },
  deliveryInfo: {
    flexDirection: 'row',
    padding: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  pickupTimeRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  pickupTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  timeIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  sectionContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  progressTracker: {
    position: 'relative',
    height: 70,
    marginBottom: 8,
  },
  progressLine: {
    position: 'absolute',
    top: 12,
    left: 0,
    height: 2,
    zIndex: 1,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  step: {
    alignItems: 'center',
    width: '25%',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
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
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  actionsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  supportButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});