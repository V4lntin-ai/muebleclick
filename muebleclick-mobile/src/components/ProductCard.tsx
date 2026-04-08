import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography, shadows } from '../theme';
import { Producto } from '../types';
import { useCartStore } from '../stores';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 3) / 2;

interface ProductCardProps {
  producto: Producto;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, onPress }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addItem(producto, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {producto.imagenUrl ? (
          <Image
            source={{ uri: producto.imagenUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={40} color={colors.text.tertiary} />
          </View>
        )}
        {producto.stockDisponible && producto.stockDisponible > 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.outOfStock}>
            <Text style={styles.outOfStockText}>Agotado</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{producto.categoria}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={styles.price}>{formatPrice(producto.precioVenta)}</Text>
        {producto.muebleria && (
          <Text style={styles.store} numberOfLines={1}>
            {producto.muebleria.nombreNegocio}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  outOfStock: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  outOfStockText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: spacing.sm,
  },
  category: {
    ...typography.caption,
    color: colors.primary[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text.primary,
    marginTop: spacing.xs,
    minHeight: 40,
  },
  price: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary[700],
    marginTop: spacing.xs,
  },
  store: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
});
