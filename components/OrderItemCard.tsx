import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { CartItem } from '@/types';
import Colors from '@/constants/Colors';

interface OrderItemCardProps {
  item: CartItem;
  onPress?: () => void;
}

export default function OrderItemCard({ item, onPress }: OrderItemCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity 
      style={[styles.container, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.producer, { color: colors.primary }]}>
            {item.product.producer.name}
          </Text>
          {item.product.isOrganic && (
            <View style={[styles.badge, { backgroundColor: colors.success }]}>
              <Text style={styles.badgeText}>Bio</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.name, { color: colors.text }]}>
          {item.product.name}
        </Text>
        
        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: colors.text }]}>
            {item.product.price.toFixed(2)} € / {item.product.unit}
          </Text>
          <Text style={[styles.quantity, { color: colors.placeholder }]}>
            Qté: {item.quantity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  producer: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  quantity: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});