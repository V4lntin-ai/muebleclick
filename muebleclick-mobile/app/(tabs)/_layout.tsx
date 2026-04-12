import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { colors } from '../../src/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.text.tertiary,
        headerShown: true,
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { fontWeight: '600', color: colors.text.primary },
        headerShadowVisible: false,
        tabBarStyle: { 
          backgroundColor: colors.white, 
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: { 
          fontSize: 10, 
          fontWeight: '500',
          marginTop: -4, 
        }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="catalogo" 
        options={{ title: 'Categorías', tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="mueblerias" 
        options={{ title: 'Mueblerías', tabBarIcon: ({ color }) => <Ionicons name="storefront-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="carrito" 
        options={{ title: 'Carrito', tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="mas" 
        options={{ title: 'Más', tabBarIcon: ({ color }) => <Ionicons name="menu-outline" size={24} color={color} /> }} 
      />

      <Tabs.Screen name="pedidos" options={{ href: null, title: 'Mis Compras' }} />
      <Tabs.Screen name="perfil" options={{ href: null, title: 'Mi Perfil' }} />
    </Tabs>
  );
}