import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';

const { width } = Dimensions.get('window');

// 🚨 Datos simulados de mueblerías (Próximamente los traeremos de NestJS)
const MUEBLERIAS_DUMMY = [
  { id: 1, nombre: 'Muebles Troncoso', ubicacion: 'Toluca Centro', rating: 4.8, ventas: '+100', imgColor: '#FFD700' },
  { id: 2, nombre: 'Sala y Comedor VIP', ubicacion: 'Metepec', rating: 4.5, ventas: '+50', imgColor: '#FF6B6B' },
  { id: 3, nombre: 'Mueblería La Malinche', ubicacion: 'San Pablo Autopan', rating: 4.9, ventas: '+200', imgColor: '#4ECDC4' },
  { id: 4, nombre: 'Descanso Perfecto', ubicacion: 'Zinacantepec', rating: 4.2, ventas: '+20', imgColor: '#A8E6CF' },
  { id: 5, nombre: 'Hogar Minimalista', ubicacion: 'Lerma', rating: 4.7, ventas: '+80', imgColor: '#D4A5A5' },
];

export default function MuebleriasScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Tabs.Screen options={{ headerShown: false }} />

      {/* ENCABEZADO */}
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Nuestras Tiendas</Text>
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.subtitle}>Encuentra los mejores muebles cerca de ti.</Text>

          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={colors.primary[500]} />
            </View>
          ) : (
            <View style={styles.listContainer}>
              {MUEBLERIAS_DUMMY.map((tienda) => (
                <TouchableOpacity key={tienda.id} style={styles.storeCard} activeOpacity={0.8}>
                  
                  {/* Ícono o Logo simulado de la tienda */}
                  <View style={[styles.storeImagePlaceholder, { backgroundColor: tienda.imgColor }]}>
                    <Ionicons name="storefront" size={40} color={colors.white} />
                  </View>
                  
                  {/* Información de la tienda */}
                  <View style={styles.storeInfo}>
                    <View style={styles.storeHeader}>
                      <Text style={styles.storeName} numberOfLines={1}>{tienda.nombre}</Text>
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{tienda.rating}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.storeLocationRow}>
                      <Ionicons name="location-outline" size={14} color={colors.text.secondary} />
                      <Text style={styles.storeLocation}>{tienda.ubicacion}</Text>
                    </View>

                    <View style={styles.storeStatsRow}>
                      <Text style={styles.storeStatsText}>{tienda.ventas} ventas concretadas</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.primary[500]} />
                    </View>
                  </View>

                </TouchableOpacity>
              ))}
            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary[600] },
  container: { flex: 1, backgroundColor: colors.background },
  customHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', // Centramos el título
    backgroundColor: colors.primary[600], 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.md,
  },
  headerTitle: { ...typography.h3, color: colors.white, fontWeight: '600' },
  scrollContent: { padding: spacing.md, paddingBottom: 40 },
  
  subtitle: { ...typography.body, color: colors.text.secondary, marginBottom: spacing.lg, textAlign: 'center' },
  
  listContainer: { paddingBottom: spacing.md },
  
  storeCard: { 
    flexDirection: 'row', 
    backgroundColor: colors.white, 
    borderRadius: borderRadius.lg, 
    padding: spacing.md, 
    marginBottom: spacing.md, 
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  storeImagePlaceholder: { 
    width: 80, 
    height: 80, 
    borderRadius: borderRadius.md, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: spacing.md 
  },
  storeInfo: { flex: 1, justifyContent: 'center' },
  storeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  storeName: { ...typography.body, fontWeight: '700', color: colors.text.primary, flex: 1, marginRight: spacing.xs },
  
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBE6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#B8860B', marginLeft: 2 },
  
  storeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  storeLocation: { ...typography.caption, color: colors.text.secondary, marginLeft: 4 },
  
  storeStatsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  storeStatsText: { fontSize: 12, color: colors.primary[600], fontWeight: '500' },
  
  centerContainer: { padding: spacing.xxl, alignItems: 'center' },
});