import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { products } from '@/data/mockData';
import { CartItem } from '@/types';
import { ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  // Initial cart items with sample data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 2 },
    { product: products[2], quantity: 1 },
    { product: products[5], quantity: 1 }
  ]);

  const updateQuantity = (productId: string, amount: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + amount;
          if (newQuantity <= 0) {
            return null; // Will be filtered out below
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[] // Filter out null items
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Panier" showBackButton />
      
      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.itemsContainer}>
              {cartItems.map(item => (
                <View 
                  key={item.product.id} 
                  style={[styles.cartItem, { borderBottomColor: colors.border }]}
                >
                  <Image source={{ uri: item.product.image }} style={styles.productImage} />
                  
                  <View style={styles.productDetails}>
                    <Text style={[styles.productName, { color: colors.text }]}>
                      {item.product.name}
                    </Text>
                    <Text style={[styles.productProducer, { color: colors.primary }]}>
                      {item.product.producer.name}
                    </Text>
                    <Text style={[styles.productPrice, { color: colors.text }]}>
                      {item.product.price.toFixed(2)} € / {item.product.unit}
                    </Text>
                  </View>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={[styles.quantityButton, { borderColor: colors.border }]}
                      onPress={() => updateQuantity(item.product.id, -1)}
                    >
                      <Minus size={16} color={colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={[styles.quantityText, { color: colors.text }]}>
                      {item.quantity}
                    </Text>
                    
                    <TouchableOpacity 
                      style={[styles.quantityButton, { borderColor: colors.border }]}
                      onPress={() => updateQuantity(item.product.id, 1)}
                    >
                      <Plus size={16} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            
            {/* Summary */}
            <View style={[styles.summaryContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>Résumé de la commande</Text>
              
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.text }]}>Sous-total</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>{subtotal.toFixed(2)} €</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.text }]}>Frais de livraison</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>{deliveryFee.toFixed(2)} €</Text>
              </View>
              
              <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
              
              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>{total.toFixed(2)} €</Text>
              </View>
            </View>
            
            {/* Bottom spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
          
          {/* Checkout button */}
          <View style={[styles.checkoutContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/checkout')}
            >
              <Text style={styles.checkoutButtonText}>Passer à la caisse</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={colors.primary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Votre panier est vide</Text>
          <Text style={[styles.emptySubtitle, { color: colors.placeholder }]}>
            Parcourez nos produits et ajoutez-les à votre panier
          </Text>
          <TouchableOpacity 
            style={[styles.browseButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.browseButtonText}>Explorer les produits</Text>
          </TouchableOpacity>
        </View>
      )}
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
  itemsContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  productProducer: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginHorizontal: 8,
  },
  summaryContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
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
  summaryDivider: {
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
  checkoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  checkoutButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 8,
  },
  bottomSpacing: {
    height: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});