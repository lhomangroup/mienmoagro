import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Product } from '@/types';
import { Heart, Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: ProductCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity 
          style={[styles.favoriteButton, { backgroundColor: colors.background }]}
          onPress={() => onToggleFavorite(product)}
        >
          <Heart 
            size={16} 
            color={isFavorite ? colors.error : colors.tabIconDefault} 
            fill={isFavorite ? colors.error : 'none'} 
          />
        </TouchableOpacity>
        {product.isOrganic && (
          <View style={[styles.badge, { backgroundColor: colors.success }]}>
            <Text style={styles.badgeText}>Bio</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.producer, { color: colors.primary }]}>
          {product.producer.name}
        </Text>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.text }]}>
            {product.price.toFixed(2)} €
            <Text style={[styles.unit, { color: colors.placeholder }]}> / {product.unit}</Text>
          </Text>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => onAddToCart(product)}
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 16,
    marginBottom: 16,
  },
  imageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  infoContainer: {
    padding: 12,
  },
  producer: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  unit: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});