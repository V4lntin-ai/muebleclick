import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Tabs } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../src/theme';
import { useAuthStore } from '../../src/stores';

const GET_PERFIL_RESUMEN = gql`
  query GetPerfilResumen {
    perfil {
      idUsuario: id_usuario
      nombre
    }
  }
`;

export default function MasScreen() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const client = useApolloClient();

  const [novedades] = useState({
    tiendas: false,    
    opiniones: true,   
    cupones: false,    
  });

  const { data, loading } = useQuery(GET_PERFIL_RESUMEN, {
    skip: !isAuthenticated,
    fetchPolicy: 'cache-first',
  });

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          logout();
          await client.clearStore();
          router.replace('/(tabs)');
        },
      },
    ]);
  };

  const MenuItem = ({ icon, title, onPress, isNew = false }: { icon: any, title: string, onPress: () => void, isNew?: boolean }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={22} color={colors.text.secondary} style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NUEVO</Text></View>}
        <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Tabs.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Cabecera del Usuario */}
        <TouchableOpacity 
          style={styles.headerCard} 
          onPress={() => isAuthenticated ? router.push('/(tabs)/perfil') : router.push('/(auth)/login')}
        >
          <View style={styles.avatarContainer}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : isAuthenticated ? (
              <Text style={styles.avatarText}>
                {(data as any)?.perfil?.nombre?.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Ionicons name="person" size={36} color={colors.white} />
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{isAuthenticated ? (data as any)?.perfil?.nombre : 'Ingresa a tu cuenta'}</Text>
            <Text style={styles.userSubtitle}>Mi perfil</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text.tertiary} />
        </TouchableOpacity>

        {/* Menú Principal */}
        <View style={styles.section}>
          <MenuItem icon="bag-check-outline" title="Mis compras" onPress={() => router.push('/(tabs)/pedidos')} />
          <MenuItem icon="notifications-outline" title="Notificaciones" onPress={() => {}} />
          <MenuItem icon="heart-outline" title="Favoritos" onPress={() => {}} />
          <MenuItem icon="storefront-outline" title="Tiendas que sigo" onPress={() => {}} isNew={novedades.tiendas} />
          
          <MenuItem icon="ticket-outline" title="Cupones" onPress={() => {}} isNew={novedades.cupones} />
          <MenuItem icon="star-outline" title="Mis opiniones" onPress={() => {}} isNew={novedades.opiniones} />
          <MenuItem icon="time-outline" title="Historial" onPress={() => {}} />
          <MenuItem icon="settings-outline" title="Configuración" onPress={() => {}} />
          <MenuItem icon="help-circle-outline" title="Ayuda" onPress={() => {}} />
        </View>

        {/* Botón Cerrar Sesión */}
        {isAuthenticated && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { paddingBottom: 40 },
  
  headerCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    paddingTop: spacing.lg, 
    paddingBottom: spacing.lg, 
    paddingHorizontal: spacing.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  avatarContainer: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: colors.primary[500], 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: spacing.md 
  },
  avatarText: { ...typography.h1, color: colors.white },
  headerInfo: { flex: 1 },
  userName: { ...typography.h2, color: colors.text.primary, marginBottom: 4 },
  userSubtitle: { ...typography.body, color: colors.text.secondary },

  section: { 
    backgroundColor: colors.white, 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg, 
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: spacing.md },
  menuText: { ...typography.body, color: colors.text.primary },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  newBadge: { backgroundColor: colors.info, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: spacing.sm },
  newBadgeText: { fontSize: 10, fontWeight: 'bold', color: colors.white },

  logoutButton: { 
    backgroundColor: colors.white, 
    paddingVertical: spacing.lg, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: spacing.md, 
  },
  logoutText: { 
    ...typography.body, 
    color: colors.error, 
    fontWeight: '600',
    fontSize: 16
  },
});