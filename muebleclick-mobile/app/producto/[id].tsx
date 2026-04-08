import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { api } from '../../src/services/api';
import { Button } from '../../src/components';
import { useCartStore } from '../../src/stores';

export default function ProductoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [cantidad, setCantidad] = React.useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['producto', id],
    queryFn: () => api.getProducto(parseInt(id || '0')),
    enabled: !!id,
  });

  const producto = data?.producto;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (producto) {
      addItem(producto, cantidad);
      Alert.alert(
        'Producto Agregado',
        `${producto.nombre} se ha agregado al carrito`,
        [
          { text: 'Seguir Comprando', style: 'cancel' },
          { text: 'Ver Carrito', onPress: () => router.push('/(tabs)/carrito') },
        ]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (error || !producto) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
        <Text style={styles.errorTitle}>Producto no encontrado</Text>
        <Button
          title="Volver al Cat\u00e1logo"
          onPress={() => router.back()}
          variant="primary"
        />
      </View>
    );
  }

  const stockDisponible = producto.stockDisponible || 0;
  const isOutOfStock = stockDisponible <= 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          {producto.imagenUrl ? (
            <Image
              source={{ uri: producto.imagenUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={80} color={colors.text.tertiary} />
            </View>
          )}
          {isOutOfStock && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Agotado</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category & SKU */}
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{producto.categoria}</Text>
            </View>
            <Text style={styles.sku}>SKU: {producto.sku}</Text>
          </View>

          {/* Name & Price */}
          <Text style={styles.name}>{producto.nombre}</Text>
          <Text style={styles.price}>{formatPrice(producto.precioVenta)}</Text>

          {/* Stock */}
          <View style={styles.stockRow}>
            <Ionicons
              name={isOutOfStock ? 'close-circle' : 'checkmark-circle'}
              size={18}
              color={isOutOfStock ? colors.error : colors.success}
            />
            <Text
              style={[
                styles.stockText,
                { color: isOutOfStock ? colors.error : colors.success },
              ]}
            >
              {isOutOfStock
                ? 'Sin stock disponible'
                : `${stockDisponible} unidades disponibles`}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripci\u00f3n</Text>
            <Text style={styles.description}>
              {producto.descripcion || 'Sin descripci\u00f3n disponible.'}
            </Text>
          </View>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Especificaciones</Text>
            <View style={styles.specsGrid}>
              {producto.pesoKg && (
                <View style={styles.specItem}>
                  <Ionicons name="scale-outline" size={20} color={colors.primary[600]} />
                  <Text style={styles.specLabel}>Peso</Text>
                  <Text style={styles.specValue}>{producto.pesoKg} kg</Text>
                </View>
              )}
              {producto.volumenM3 && (
                <View style={styles.specItem}>
                  <Ionicons name="cube-outline" size={20} color={colors.primary[600]} />
                  <Text style={styles.specLabel}>Volumen</Text>
                  <Text style={styles.specValue}>{producto.volumenM3} m\u00b3</Text>
                </View>
              )}
              <View style={styles.specItem}>
                <Ionicons name="pricetag-outline" size={20} color={colors.primary[600]} />
                <Text style={styles.specLabel}>Unidad</Text>
                <Text style={styles.specValue}>{producto.unidadMedida}</Text>
              </View>
            </View>
          </View>

          {/* Store Info */}
          {producto.muebleria && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vendido por</Text>
              <View style={styles.storeCard}>
                <View style={styles.storeIcon}>
                  <Ionicons name="storefront" size={24} color={colors.primary[600]} />
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{producto.muebleria.nombreNegocio}</Text>
                  {producto.muebleria.telefono && (
                    <Text style={styles.storeContact}>
                      <Ionicons name="call-outline" size={12} color={colors.text.tertiary} />
                      {' '}{producto.muebleria.telefono}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      {!isOutOfStock && (
        <View style={styles.bottomActions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setCantidad(Math.max(1, cantidad - 1))}
            >
              <Ionicons name="remove" size={20} color={colors.primary[600]} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cantidad}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setCantidad(Math.min(stockDisponible, cantidad + 1))}
            >
              <Ionicons name="add" size={20} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>
          <Button
            title="Agregar al Carrito"
            onPress={handleAddToCart}
            variant="primary"
            size="large"
            style={styles.addButton}
            icon={<Ionicons name="cart-outline" size={20} color={colors.white} />}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  errorTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.white,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary[100],
  },
  outOfStockBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  outOfStockText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.primary[700],
    textTransform: 'uppercase',
  },
  sku: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  name: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.h1,
    color: colors.primary[700],
    marginBottom: spacing.sm,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  stockText: {
    ...typography.bodySmall,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specItem: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 100,
    ...shadows.sm,
  },
  specLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  specValue: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text.primary,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  storeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeInfo: {
    marginLeft: spacing.md,
  },
  storeName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  storeContact: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
    ...shadows.lg,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    minWidth: 36,
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
  },
});
