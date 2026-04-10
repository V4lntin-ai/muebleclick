import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Tabs } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { ProductCard } from '../../src/components';

const { width } = Dimensions.get('window');

interface Producto {
  idProducto: string;
  nombre: string;
  precioVenta: number;
  imagenUrl: string;
  categoria: string;
}

interface ProductosData {
  productos: {
    items: Producto[];
  };
}

const GET_PRODUCTOS = gql`
  query GetProductos($categoria: String) {
    productos(categoria: $categoria) {
      items {
        idProducto: id_producto
        nombre
        precioVenta: precio_venta
        imagenUrl: imagen_url
        categoria
      }
    }
  }
`;

const CATEGORIAS_VISUALES = [
  { nombre: 'Salas', icon: 'tv-outline', color: '#E8F3FF', iconColor: '#2B80FF' },
  { nombre: 'Comedores', icon: 'restaurant-outline', color: '#FFF0E6', iconColor: '#FF7315' },
  { nombre: 'Recámaras', icon: 'bed-outline', color: '#E6F9EC', iconColor: '#00BA4A' },
  { nombre: 'Oficina', icon: 'desktop-outline', color: '#F3E8FF', iconColor: '#8E33FF' },
  { nombre: 'Libreros', icon: 'library-outline', color: '#FFE8EC', iconColor: '#FF3366' },
  { nombre: 'Decoración', icon: 'color-palette-outline', color: '#FFFFE0', iconColor: '#E6B800' },
  { nombre: 'Jardín', icon: 'leaf-outline', color: '#E8F8FF', iconColor: '#00A3FF' },
  { nombre: 'Clósets', icon: 'shirt-outline', color: '#F5F5F5', iconColor: '#666666' },
];

export default function CatalogoScreen() {
  const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  const { data, loading } = useQuery<ProductosData>(GET_PRODUCTOS, {
    variables: { categoria: categoriaSeleccionada },
    fetchPolicy: 'cache-and-network'
  });

  const productos = data?.productos?.items || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Tabs.Screen options={{ headerShown: false }} />

      <View style={styles.customHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(tabs)')} 
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categorías</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {!categoriaSeleccionada ? (
            <View>
              <Text style={styles.sectionTitle}>¿Qué estás buscando hoy?</Text>
              
              <View style={styles.gridContainer}>
                {CATEGORIAS_VISUALES.map((cat, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.categoryCard}
                    onPress={() => setCategoriaSeleccionada(cat.nombre)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.iconCircle, { backgroundColor: cat.color }]}>
                      <Ionicons name={cat.icon as any} size={32} color={cat.iconColor} />
                    </View>
                    <Text style={styles.categoryName}>{cat.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}

          {categoriaSeleccionada && (
            <View>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Explorando {categoriaSeleccionada}</Text>
                
                <TouchableOpacity style={styles.clearFilterBtn} onPress={() => setCategoriaSeleccionada(null)}>
                  <Text style={styles.clearFilterText}>Ver categorías</Text>
                  <Ionicons name="close" size={16} color={colors.primary[600]} />
                </TouchableOpacity>
              </View>

              {loading ? (
                <View style={styles.centerContainer}>
                  <ActivityIndicator size="large" color={colors.primary[500]} />
                </View>
              ) : productos.length > 0 ? (
                <View style={styles.productsGrid}>
                  {productos.map((producto: any) => (
                    <ProductCard 
                      key={producto.idProducto} 
                      producto={producto} 
                      onPress={() => router.push(`/producto/${producto.idProducto}`)} 
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Ionicons name="sad-outline" size={64} color={colors.text.tertiary} />
                  <Text style={styles.emptyText}>Aún no hay muebles en esta categoría.</Text>
                </View>
              )}
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
    justifyContent: 'space-between',
    backgroundColor: colors.primary[600], 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.md,
  },
  backButton: { paddingRight: spacing.sm },
  headerTitle: { ...typography.h3, color: colors.white, fontWeight: '600' },
  
  scrollContent: { padding: spacing.md, paddingBottom: 40 },
  
  sectionTitle: { 
    fontSize: 18,
    fontWeight: '600', 
    color: colors.text.primary, 
    marginBottom: spacing.md, 
    marginTop: spacing.xs
  },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { 
    width: (width - spacing.md * 2 - spacing.md) / 2, 
    backgroundColor: colors.white, 
    borderRadius: borderRadius.lg, 
    padding: spacing.lg, 
    alignItems: 'center', 
    marginBottom: spacing.md, 
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  iconCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  categoryName: { ...typography.body, fontWeight: '600', color: colors.text.primary },

  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md, marginTop: spacing.sm },
  resultsTitle: { ...typography.h3, color: colors.text.primary, flex: 1 },
  clearFilterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary[50], paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  clearFilterText: { ...typography.caption, color: colors.primary[600], fontWeight: '600', marginRight: 4 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  
  centerContainer: { padding: spacing.xxl, alignItems: 'center' },
  emptyContainer: { alignItems: 'center', padding: spacing.xl, marginTop: spacing.xl },
  emptyText: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.md },
});