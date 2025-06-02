import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Category } from '@/types';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <ImageBackground 
        source={{ uri: category.image }} 
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.count}>{category.productsCount} produits</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 12,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  count: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});