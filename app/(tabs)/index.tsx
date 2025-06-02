import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { products, categories, producers } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ProducerCard from '@/components/ProducerCard';
import { useRouter } from 'expo-router';
import { MapPin, Search } from 'lucide-react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
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

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Bonjour,</Text>
          <Text style={[styles.locationText, { color: colors.text }]}>
            <MapPin size={14} color={colors.primary} style={styles.locationIcon} />
            <Text> Nice, 06000</Text>
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.searchButton, { backgroundColor: colors.lightGray }]}
          onPress={() => router.push('/search')}
        >
          <Search size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Hero Banner */}
      <TouchableOpacity style={styles.banner} activeOpacity={0.9}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1268558/pexels-photo-1268558.jpeg' }} 
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Cuisinez local avec MienmoAgro</Text>
          <Text style={styles.bannerSubtitle}>Découvrez les meilleurs producteurs près de chez vous</Text>
          <TouchableOpacity 
            style={[styles.bannerButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.bannerButtonText}>Explorer</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Catégories</Text>
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Produits en vedette</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          {products.slice(0, 6).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Local Producers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Producteurs locaux</Text>
          <TouchableOpacity onPress={() => router.push('/producers')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.producersContainer}>
          {producers.slice(0, 3).map(producer => (
            <ProducerCard key={producer.id} producer={producer} />
          ))}
        </View>
      </View>
      
      {/* Spacing at bottom */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  bannerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  categoriesContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  productsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  producersContainer: {
    paddingHorizontal: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});