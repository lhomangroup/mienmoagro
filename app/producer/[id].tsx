import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { producers, products } from '@/data/mockData';
import { MapPin, Star, Phone, Mail, Clock, ExternalLink } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';

export default function ProducerDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const producer = producers.find(p => p.id === id);
  const producerProducts = products.filter(p => p.producer.id === id);
  
  // State for favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  
  const addToCart = (productId: string) => {
    // In a real app, this would add the product to a cart state or context
    console.log('Added to cart:', productId);
  };

  // Days and hours (example data)
  const openingHours = [
    { day: 'Lundi', hours: '9h00 - 17h00' },
    { day: 'Mardi', hours: '9h00 - 17h00' },
    { day: 'Mercredi', hours: '9h00 - 17h00' },
    { day: 'Jeudi', hours: '9h00 - 17h00' },
    { day: 'Vendredi', hours: '9h00 - 17h00' },
    { day: 'Samedi', hours: '9h00 - 13h00' },
    { day: 'Dimanche', hours: 'Fermé' },
  ];
  
  if (!producer) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Producteur" showBackButton showCart cartItemsCount={3} />
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            Producteur introuvable
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={producer.name} showBackButton showCart cartItemsCount={3} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: producer.image }} style={styles.heroImage} />
          <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <Text style={styles.producerName}>{producer.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{producer.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        
        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MapPin size={20} color={colors.primary} />
            <Text style={[styles.infoCardText, { color: colors.text }]}>
              {producer.location} • {producer.distance} km
            </Text>
          </View>
          
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Phone size={20} color={colors.primary} />
            <Text style={[styles.infoCardText, { color: colors.text }]}>
              06 12 34 56 78
            </Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>À propos</Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {producer.description}
          </Text>
        </View>
        
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Spécialités</Text>
          <View style={styles.categoriesContainer}>
            {producer.categories.map((category, index) => (
              <View 
                key={index} 
                style={[styles.categoryBadge, { backgroundColor: colors.lightGray }]}
              >
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Opening Hours */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Horaires d'ouverture</Text>
          <View style={[styles.hoursCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {openingHours.map((item, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={[styles.dayText, { color: colors.text }]}>{item.day}</Text>
                <Text 
                  style={[
                    styles.hourText, 
                    { 
                      color: item.hours === 'Fermé' ? colors.error : colors.text 
                    }
                  ]}
                >
                  {item.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Products */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Produits ({producerProducts.length})</Text>
          
          <View style={styles.productsGrid}>
            {producerProducts.map(product => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  isFavorite={favorites.includes(product.id)}
                />
              </View>
            ))}
          </View>
        </View>
        
        {/* Website Link */}
        <TouchableOpacity 
          style={[styles.websiteButton, { backgroundColor: colors.primary }]}
          onPress={() => console.log('Open website')}
        >
          <Text style={styles.websiteButtonText}>Visiter le site web</Text>
          <ExternalLink size={16} color="white" />
        </TouchableOpacity>
        
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
  heroContainer: {
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  producerName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginLeft: 4,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
  },
  infoCardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 8,
  },
  sectionContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  hoursCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  hourText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  websiteButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginRight: 8,
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