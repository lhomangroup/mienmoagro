import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showCart?: boolean;
  cartItemsCount?: number;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  showCart = false,
  cartItemsCount = 0
}: HeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.lightGray }]} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {showCart && (
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.lightGray }]}
            onPress={() => router.push('/cart')}
          >
            <ShoppingBag size={20} color={colors.text} />
            {cartItemsCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
});