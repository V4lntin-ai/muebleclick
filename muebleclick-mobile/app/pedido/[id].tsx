import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { api } from '../../src/services/api';
import { Button } from '../../src/components';

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pendiente: colors.warning,
    confirmado: colors.info,
    en_proceso: colors.info,
    enviado: colors.primary[500],
    entregado: colors.success,
    cancelado: colors.error,
    completada: colors.success,
  };
  return statusColors[status] || colors.text.tertiary;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    en_proceso: 'En Proceso',
    enviado: 'Enviado',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
    completada: 'Completada',
  };
  return labels[status] || status;
};

export default function PedidoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['pedido', id],
    queryFn: () => api.getPedido(parseInt(id || '0')),
    enabled: !!id,
  });

  const venta = data?.pedido;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (error || !venta) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
        <Text style={styles.errorTitle}>Pedido no encontrado</Text>
        <Button
          title="Volver a Mis Pedidos"
          onPress={() => router.back()}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Order Header */}
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.orderId}>Pedido #{venta.idPedido}</Text>
            <Text style={styles.orderDate}>{formatDate(venta.fechaVenta)}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(venta.pedido?.estadoPedido || venta.estadoVenta) + '20' },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(venta.pedido?.estadoPedido || venta.estadoVenta) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(venta.pedido?.estadoPedido || venta.estadoVenta) },
              ]}
            >
              {getStatusLabel(venta.pedido?.estadoPedido || venta.estadoVenta)}
            </Text>
          </View>
        </View>

        {venta.pedido && (
          <View style={styles.deliveryInfo}>
            <Ionicons
              name={venta.pedido.tipoEntrega === 'domicilio' ? 'car-outline' : 'storefront-outline'}
              size={18}
              color={colors.text.secondary}
            />
            <Text style={styles.deliveryText}>
              {venta.pedido.tipoEntrega === 'domicilio'
                ? 'Env\u00edo a domicilio'
                : 'Recoger en tienda'}
            </Text>
          </View>
        )}
      </View>

      {/* Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos</Text>
        {venta.detalles.map((detalle: any) => (
          <View key={detalle.idDetalleVenta} style={styles.productCard}>
            <Image
              source={{ uri: detalle.producto?.imagenUrl || 'https://via.placeholder.com/80' }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {detalle.producto?.nombre}
              </Text>
              <Text style={styles.productSku}>SKU: {detalle.producto?.sku}</Text>
              <View style={styles.productPriceRow}>
                <Text style={styles.productQuantity}>x{detalle.cantidad}</Text>
                <Text style={styles.productPrice}>
                  {formatPrice(detalle.precioUnitario)}
                </Text>
              </View>
            </View>
            <Text style={styles.productSubtotal}>
              {formatPrice(detalle.subtotal)}
            </Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Resumen</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(venta.subTotal)}</Text>
        </View>
        {venta.descuento > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Descuento</Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>
              -{formatPrice(venta.descuento)}
            </Text>
          </View>
        )}
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(venta.totalVenta)}</Text>
        </View>
      </View>

      {/* Notes */}
      {venta.pedido?.notas && (
        <View style={styles.notesCard}>
          <Text style={styles.sectionTitle}>Notas</Text>
          <Text style={styles.notesText}>{venta.pedido.notas}</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title="Volver a Mis Pedidos"
          onPress={() => router.push('/(tabs)/pedidos')}
          variant="outline"
          fullWidth
        />
      </View>
    </ScrollView>
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
  headerCard: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    ...typography.h3,
    color: colors.text.primary,
  },
  orderDate: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  deliveryText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
  },
  productInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  productName: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text.primary,
  },
  productSku: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  productQuantity: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  productPrice: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  productSubtotal: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    alignSelf: 'center',
  },
  summaryCard: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  discountValue: {
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.h2,
    color: colors.primary[700],
  },
  notesCard: {
    backgroundColor: colors.secondary[50],
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.secondary[200],
  },
  notesText: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  actionsContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});
