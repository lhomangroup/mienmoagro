import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Producer } from '@/types';
import Colors from '@/constants/Colors';
import { MapPin, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ProducerCardProps {
  producer: Producer;
}

export default function ProducerCard({ producer }: ProducerCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handlePress = () => {
    router.push(`/producer/${producer.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: producer.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{producer.name}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <MapPin size={14} color={colors.primary} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {producer.distance} km
            </Text>
          </View>
          
          <View style={styles.detail}>
            <Star size={14} color={colors.accent} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {producer.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.categoriesContainer}>
          {producer.categories.slice(0, 2).map((category, index) => (
            <View 
              key={index} 
              style={[styles.categoryBadge, { backgroundColor: colors.lightGray }]}
            >
              <Text style={[styles.categoryText, { color: colors.text }]}>
                {category}
              </Text>
            </View>
          ))}
          {producer.categories.length > 2 && (
            <Text style={[styles.moreText, { color: colors.placeholder }]}>
              +{producer.categories.length - 2}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  moreText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
});