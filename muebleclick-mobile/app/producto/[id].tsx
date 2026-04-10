import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../../src/theme';
import { useCartStore } from '../../src/stores';
import { Button } from '../../src/components';

const { width } = Dimensions.get('window');

interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  imagenUrl: string;
  categoria: string;
  inventario?: {
    cantidad_disponible: number;
  };
}

interface GetProductoData {
  producto: Producto;
}

const GET_PRODUCTO_BY_ID = gql`
  query GetProducto($id: Int!) {
    producto(id: $id) {
      idProducto: id_producto
      nombre
      descripcion
      precioVenta: precio_venta
      imagenUrl: imagen_url
      categoria
      inventario {
        cantidad_disponible
      }
    }
  }
`;

export default function ProductoDetalleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();

  const [cantidad, setCantidad] = useState(1);

  const { data, loading, error } = useQuery<GetProductoData>(GET_PRODUCTO_BY_ID, {
    variables: { id: parseInt(id as string) },
    skip: !id,
    fetchPolicy: 'network-only' 
  });

  const producto = data?.producto;

  const stockDisponible = producto?.inventario?.cantidad_disponible || 0;

  const formatPrice = (price: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

  const handleAddToCart = () => {
    if (!producto) return;
    
    addItem({
      producto: {
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        precioVenta: producto.precioVenta,
        imagenUrl: producto.imagenUrl,
      },
      cantidad: cantidad
    });

    Alert.alert(
      '¡Agregado!', 
      `${producto.nombre} se agregó a tu carrito.`,
      [
        { text: 'Seguir comprando', style: 'cancel' },
        { text: 'Ver Carrito', onPress: () => router.push('/(tabs)/carrito') }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Cargando...', headerBackTitle: 'Atrás' }} />
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Ionicons name="alert-circle-outline" size={64} color={colors.text.tertiary} />
        <Text style={styles.errorText}>No pudimos encontrar este mueble.</Text>
        
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', padding: 20, marginBottom: 20, fontWeight: 'bold' }}>
            Error detectado: {error.message}
          </Text>
        )}

        <Button title="Volver al catálogo" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.favButton}>
              <Ionicons name="heart-outline" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: producto.imagenUrl || 'https://via.placeholder.com/400' }} 
            style={styles.productImage} 
            resizeMode="cover" 
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{producto.categoria}</Text>
          </View>
          
          <Text style={styles.productName}>{producto.nombre}</Text>
          <Text style={styles.productPrice}>{formatPrice(producto.precioVenta)}</Text>
          
          <Text style={styles.shippingText}>
            <Ionicons name="car-outline" size={16} color={colors.success} /> Envío gratis a todo el país
          </Text>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Acerca de este mueble</Text>
          {/* 🚨 Aquí ya usamos la descripción REAL de tu base de datos */}
          <Text style={styles.description}>{producto.descripcion}</Text>

          <View style={styles.divider} />
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Cantidad:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.qtyButton} onPress={() => setCantidad(Math.max(1, cantidad - 1))}>
                <Ionicons name="remove" size={20} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{cantidad}</Text>
              <TouchableOpacity style={styles.qtyButton} onPress={() => setCantidad(Math.min(stockDisponible, cantidad + 1))}>
                <Ionicons name="add" size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.stockText}>({stockDisponible} disponibles)</Text>
          </View>

        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarPrice}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatPrice(producto.precioVenta * cantidad)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  errorText: { ...typography.body, color: colors.text.secondary, marginTop: spacing.md, marginBottom: spacing.lg },
  
  backButton: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 20, marginLeft: spacing.md },
  favButton: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 20, marginRight: spacing.md },

  scrollContent: { paddingBottom: 100 }, // Espacio extra para que la barra flotante no tape contenido
  
  imageContainer: { width: width, height: width * 1.1, backgroundColor: colors.white },
  productImage: { width: '100%', height: '100%' },

  infoContainer: { backgroundColor: colors.white, padding: spacing.lg, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, ...shadows.md },
  
  tagContainer: { alignSelf: 'flex-start', backgroundColor: colors.primary[50], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: spacing.sm },
  tagText: { fontSize: 12, fontWeight: '600', color: colors.primary[600], textTransform: 'uppercase' },
  
  productName: { ...typography.h1, color: colors.text.primary, marginBottom: spacing.xs },
  productPrice: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.sm },
  shippingText: { ...typography.bodySmall, color: colors.success, fontWeight: '600' },
  
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.lg },
  
  sectionTitle: { ...typography.h3, color: colors.text.primary, marginBottom: spacing.sm },
  description: { ...typography.body, color: colors.text.secondary, lineHeight: 24 },

  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  quantityLabel: { ...typography.body, color: colors.text.primary, marginRight: spacing.md, fontWeight: '600' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  qtyButton: { padding: spacing.sm },
  qtyText: { ...typography.body, fontWeight: 'bold', paddingHorizontal: spacing.md },
  stockText: { ...typography.caption, color: colors.text.tertiary, marginLeft: spacing.md },

  bottomBar: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 30, borderTopWidth: 1, borderTopColor: colors.border, ...shadows.lg },
  bottomBarPrice: { flex: 1 },
  totalLabel: { ...typography.caption, color: colors.text.secondary },
  totalPrice: { ...typography.h2, color: colors.text.primary },
  addToCartBtn: { backgroundColor: colors.primary[600], paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, ...shadows.sm },
  addToCartText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
});