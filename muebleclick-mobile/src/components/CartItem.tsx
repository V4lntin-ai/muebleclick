import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography, shadows } from '../theme';
import { CartItem as CartItemType } from '../types';
import { useCartStore } from '../stores';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.producto.imagenUrl || 'https://via.placeholder.com/80' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.producto.nombre}
        </Text>
        <Text style={styles.price}>
          {formatPrice(item.producto.precioVenta)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.producto.idProducto, item.cantidad - 1)}
          >
            <Ionicons name="remove" size={18} color={colors.primary[600]} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.producto.idProducto, item.cantidad + 1)}
          >
            <Ionicons name="add" size={18} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={() => removeItem(item.producto.idProducto)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
        <Text style={styles.subtotal}>
          {formatPrice(item.producto.precioVenta * item.cantidad)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  name: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text.primary,
  },
  price: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    minWidth: 24,
    textAlign: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: spacing.xs,
  },
  subtotal: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary[700],
  },
});
