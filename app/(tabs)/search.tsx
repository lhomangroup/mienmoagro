import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { products, categories, producers } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ProducerCard from '@/components/ProducerCard';
import { ChevronDown, Filter, Search as SearchIcon } from 'lucide-react-native';

type FilterType = 'all' | 'products' | 'producers' | 'categories';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
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

  // Filter items based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducers = producers.filter(producer => 
    producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producer.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Rechercher" showCart cartItemsCount={3} />
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.lightGray }]}>
          <SearchIcon size={20} color={colors.placeholder} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher des produits, producteurs..."
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.lightGray }]}
        >
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsContent}
        >
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              activeFilter === 'all' && [styles.activeFilterTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text 
              style={[
                styles.filterTabText, 
                { color: activeFilter === 'all' ? colors.primary : colors.text }
              ]}
            >
              Tout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              activeFilter === 'products' && [styles.activeFilterTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveFilter('products')}
          >
            <Text 
              style={[
                styles.filterTabText, 
                { color: activeFilter === 'products' ? colors.primary : colors.text }
              ]}
            >
              Produits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              activeFilter === 'producers' && [styles.activeFilterTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveFilter('producers')}
          >
            <Text 
              style={[
                styles.filterTabText, 
                { color: activeFilter === 'producers' ? colors.primary : colors.text }
              ]}
            >
              Producteurs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              activeFilter === 'categories' && [styles.activeFilterTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveFilter('categories')}
          >
            <Text 
              style={[
                styles.filterTabText, 
                { color: activeFilter === 'categories' ? colors.primary : colors.text }
              ]}
            >
              Catégories
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {(searchQuery === '' && activeFilter === 'all') && (
          <View style={styles.categoriesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Catégories populaires</Text>
            <View style={styles.categoriesGrid}>
              {categories.map(category => (
                <View key={category.id} style={styles.categoryItem}>
                  <CategoryCard category={category} />
                </View>
              ))}
            </View>
          </View>
        )}

        {(activeFilter === 'all' || activeFilter === 'products') && filteredProducts.length > 0 && (
          <View style={styles.section}>
            {searchQuery !== '' && (
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Produits</Text>
            )}
            <View style={styles.productsGrid}>
              {filteredProducts.map(product => (
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
        )}

        {(activeFilter === 'all' || activeFilter === 'producers') && filteredProducers.length > 0 && (
          <View style={styles.section}>
            {searchQuery !== '' && (
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Producteurs</Text>
            )}
            <View style={styles.producersContainer}>
              {filteredProducers.map(producer => (
                <ProducerCard key={producer.id} producer={producer} />
              ))}
            </View>
          </View>
        )}

        {(activeFilter === 'all' || activeFilter === 'categories') && filteredCategories.length > 0 && searchQuery !== '' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Catégories</Text>
            <View style={styles.categoriesGrid}>
              {filteredCategories.map(category => (
                <View key={category.id} style={styles.categoryItem}>
                  <CategoryCard category={category} />
                </View>
              ))}
            </View>
          </View>
        )}

        {searchQuery !== '' && filteredProducts.length === 0 && filteredProducers.length === 0 && filteredCategories.length === 0 && (
          <View style={styles.noResults}>
            <Text style={[styles.noResultsText, { color: colors.text }]}>
              Aucun résultat trouvé pour "{searchQuery}"
            </Text>
            <Text style={[styles.noResultsSubtext, { color: colors.placeholder }]}>
              Essayez avec d'autres mots-clés ou parcourez les catégories
            </Text>
          </View>
        )}

        {/* Spacing at bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    marginBottom: 16,
  },
  filterTabsContent: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterTab: {
    borderWidth: 1,
  },
  filterTabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  categoriesSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginBottom: 16,
  },
  producersContainer: {
    width: '100%',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});