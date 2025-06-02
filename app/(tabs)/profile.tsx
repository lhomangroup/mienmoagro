import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { currentUser } from '@/data/mockData';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  CreditCard, 
  Heart, 
  HelpCircle, 
  Home, 
  LogOut, 
  MapPin, 
  Package, 
  Settings, 
  ShoppingBag, 
  User as UserIcon, 
  ChevronRight
} from 'lucide-react-native';

type MenuSection = 'account' | 'orders' | 'preferences' | 'support';

interface MenuItem {
  icon: JSX.Element;
  title: string;
  route?: string;
  action?: () => void;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  const getMenuItems = (section: MenuSection): MenuItem[] => {
    switch(section) {
      case 'account':
        return [
          { 
            icon: <UserIcon size={20} color={colors.primary} />, 
            title: 'Informations personnelles', 
            route: '/profile/personal-info'
          },
          { 
            icon: <MapPin size={20} color={colors.primary} />, 
            title: 'Adresses de livraison', 
            route: '/profile/addresses'
          },
          { 
            icon: <CreditCard size={20} color={colors.primary} />, 
            title: 'Moyens de paiement', 
            route: '/profile/payments'
          },
        ];
      case 'orders':
        return [
          { 
            icon: <ShoppingBag size={20} color={colors.primary} />, 
            title: 'Commandes passées', 
            route: '/profile/orders'
          },
          { 
            icon: <Heart size={20} color={colors.primary} />, 
            title: 'Produits favoris', 
            route: '/profile/favorites'
          },
        ];
      case 'preferences':
        return [
          { 
            icon: <Bell size={20} color={colors.primary} />, 
            title: 'Notifications', 
            route: '/profile/notifications'
          },
          { 
            icon: <Settings size={20} color={colors.primary} />, 
            title: 'Paramètres', 
            route: '/profile/settings'
          },
        ];
      case 'support':
        return [
          { 
            icon: <HelpCircle size={20} color={colors.primary} />, 
            title: 'Aide et FAQ', 
            route: '/profile/help'
          },
          { 
            icon: <LogOut size={20} color={colors.error} />, 
            title: 'Déconnexion', 
            action: () => console.log('Logout') 
          },
        ];
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Mon Profil" showCart cartItemsCount={3} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.userCard, { backgroundColor: colors.card }]}>
          <View style={styles.userInfo}>
            <View 
              style={[styles.userAvatar, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.userInitials}>
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View>
              <Text style={[styles.userName, { color: colors.text }]}>{currentUser.name}</Text>
              <Text style={[styles.userEmail, { color: colors.placeholder }]}>{currentUser.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.editButton, { borderColor: colors.border }]}
            onPress={() => router.push('/profile/edit')}
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>Modifier</Text>
          </TouchableOpacity>
        </View>
        
        {/* Recent Order */}
        {currentUser.orders.length > 0 && (
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Commande récente</Text>
            
            <TouchableOpacity 
              style={styles.orderCard}
              onPress={() => router.push(`/order/${currentUser.orders[0].id}`)}
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={[styles.orderNumber, { color: colors.text }]}>
                    Commande #{currentUser.orders[0].id.slice(-4)}
                  </Text>
                  <Text style={[styles.orderDate, { color: colors.placeholder }]}>
                    Passée le {currentUser.orders[0].date}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.statusBadge, 
                    { 
                      backgroundColor: 
                        currentUser.orders[0].status === 'completed' ? colors.success : 
                        currentUser.orders[0].status === 'processing' ? colors.accent : 
                        colors.primary 
                    }
                  ]}
                >
                  <Text style={styles.statusText}>
                    {currentUser.orders[0].status === 'completed' ? 'Livré' : 
                     currentUser.orders[0].status === 'processing' ? 'En préparation' : 
                     'En cours'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.orderItems}>
                {currentUser.orders[0].items.slice(0, 2).map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>
                        {item.product.name}
                      </Text>
                      <Text style={[styles.itemQuantity, { color: colors.placeholder }]}>
                        Qté: {item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
                
                {currentUser.orders[0].items.length > 2 && (
                  <Text style={[styles.moreItems, { color: colors.placeholder }]}>
                    +{currentUser.orders[0].items.length - 2} articles supplémentaires
                  </Text>
                )}
              </View>
              
              <View style={styles.viewOrderButton}>
                <Text style={[styles.viewOrderText, { color: colors.primary }]}>
                  Voir la commande
                </Text>
                <ChevronRight size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Menu Sections */}
        <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.menuTitle, { color: colors.text }]}>Mon compte</Text>
          {getMenuItems('account').map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                index < getMenuItems('account').length - 1 && 
                [styles.menuItemBorder, { borderBottomColor: colors.border }]
              ]}
              onPress={() => item.route ? router.push(item.route) : item.action?.()}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
              </View>
              <ChevronRight size={16} color={colors.placeholder} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.menuTitle, { color: colors.text }]}>Commandes</Text>
          {getMenuItems('orders').map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                index < getMenuItems('orders').length - 1 && 
                [styles.menuItemBorder, { borderBottomColor: colors.border }]
              ]}
              onPress={() => item.route ? router.push(item.route) : item.action?.()}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
              </View>
              <ChevronRight size={16} color={colors.placeholder} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.menuTitle, { color: colors.text }]}>Préférences</Text>
          {getMenuItems('preferences').map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                index < getMenuItems('preferences').length - 1 && 
                [styles.menuItemBorder, { borderBottomColor: colors.border }]
              ]}
              onPress={() => item.route ? router.push(item.route) : item.action?.()}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
              </View>
              <ChevronRight size={16} color={colors.placeholder} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={[styles.menuSection, { backgroundColor: colors.card, marginBottom: 32 }]}>
          <Text style={[styles.menuTitle, { color: colors.text }]}>Support</Text>
          {getMenuItems('support').map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                index < getMenuItems('support').length - 1 && 
                [styles.menuItemBorder, { borderBottomColor: colors.border }]
              ]}
              onPress={() => item.route ? router.push(item.route) : item.action?.()}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text 
                  style={[
                    styles.menuItemText, 
                    { color: item.title === 'Déconnexion' ? colors.error : colors.text }
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <ChevronRight size={16} color={colors.placeholder} />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* App Version */}
        <Text style={[styles.appVersion, { color: colors.placeholder }]}>
          MienmoAgro v1.0.0
        </Text>
        
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
  userCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitials: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  orderCard: {
    paddingBottom: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  itemQuantity: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  moreItems: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  viewOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewOrderText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginRight: 4,
  },
  menuSection: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 12,
  },
  appVersion: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});