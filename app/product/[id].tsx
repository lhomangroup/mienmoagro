import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { products } from '@/data/mockData';
import { Heart, Minus, Plus, Star, ShoppingBag } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find similar products (same category)
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Produit" showBackButton showCart cartItemsCount={3} />
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            Produit introuvable
          </Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Retourner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to a cart state or context
    console.log('Added to cart:', product.id, 'quantity:', quantity);
    router.push('/cart');
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const updateQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Produit" showBackButton showCart cartItemsCount={3} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity 
            style={[styles.favoriteButton, { backgroundColor: colors.background }]}
            onPress={toggleFavorite}
          >
            <Heart 
              size={20} 
              color={isFavorite ? colors.error : colors.text} 
              fill={isFavorite ? colors.error : 'none'} 
            />
          </TouchableOpacity>
          
          {product.isOrganic && (
            <View style={[styles.badge, { backgroundColor: colors.success }]}>
              <Text style={styles.badgeText}>Bio</Text>
            </View>
          )}
        </View>
        
        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <TouchableOpacity 
            style={styles.producerContainer}
            onPress={() => router.push(`/producer/${product.producer.id}`)}
          >
            <Text style={[styles.producer, { color: colors.primary }]}>
              {product.producer.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={colors.accent} fill={colors.accent} />
              <Text style={[styles.rating, { color: colors.text }]}>
                {product.rating.toFixed(1)}
              </Text>
            </View>
          </TouchableOpacity>
          
          <Text style={[styles.productName, { color: colors.text }]}>
            {product.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.text }]}>
              {product.price.toFixed(2)} €
              <Text style={[styles.unit, { color: colors.placeholder }]}> / {product.unit}</Text>
            </Text>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={[styles.quantityButton, { borderColor: colors.border }]}
                onPress={() => updateQuantity(-1)}
              >
                <Minus size={16} color={colors.text} />
              </TouchableOpacity>
              
              <Text style={[styles.quantityText, { color: colors.text }]}>
                {quantity}
              </Text>
              
              <TouchableOpacity 
                style={[styles.quantityButton, { borderColor: colors.border }]}
                onPress={() => updateQuantity(1)}
              >
                <Plus size={16} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <Text style={[styles.descriptionTitle, { color: colors.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {product.description}
          </Text>
          
          <View style={[styles.infoCard, { backgroundColor: colors.lightGray }]}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                Catégorie
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {product.category}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                Origine
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {product.producer.location}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                Distance
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {product.producer.distance} km
              </Text>
            </View>
          </View>
        </View>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <View style={styles.similarProductsContainer}>
            <Text style={[styles.similarProductsTitle, { color: colors.text }]}>
              Produits similaires
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarProductsList}
            >
              {similarProducts.map(similarProduct => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  onAddToCart={() => console.log('Add to cart:', similarProduct.id)}
                  onToggleFavorite={() => console.log('Toggle favorite:', similarProduct.id)}
                  isFavorite={false}
                />
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {/* Add to Cart Button */}
      <View style={[styles.addToCartContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
          onPress={handleAddToCart}
        >
          <ShoppingBag size={20} color="white" style={styles.cartIcon} />
          <Text style={styles.addToCartText}>
            Ajouter au panier - {(product.price * quantity).toFixed(2)} €
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
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  detailsContainer: {
    padding: 16,
  },
  producerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  producer: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  productName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginHorizontal: 12,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
    marginBottom: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
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
  similarProductsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  similarProductsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  similarProductsList: {
    paddingRight: 16,
  },
  addToCartContainer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  addToCartButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});