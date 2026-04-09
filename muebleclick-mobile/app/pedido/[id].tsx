import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { Button } from '../../src/components';

const GET_PEDIDO = gql`
  query GetPedido($id: Int!) {
    pedido(id: $id) {
      idPedido: id_pedido
      total
      estado
      tipoEntrega: tipo_entrega
      fechaPedido: fecha_pedido
      detalles {
        idDetalle: id_detalle
        cantidad
        precioUnitario: precio_unitario
        producto {
          nombre
          imagenUrl: imagen_url
          muebleria {
            nombreNegocio: nombre_negocio
          }
        }
      }
    }
  }
`;

export default function PedidoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_PEDIDO, {
    variables: { id: parseInt(id || '0') },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString) || dateString);
    return date.toLocaleString('es-MX', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case 'entregado': return colors.success;
      case 'enviado': return colors.info;
      case 'pagado': return colors.primary[500];
      default: return colors.warning;
    }
  };

  if (loading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color={colors.primary[500]} /></View>;

  if (error || !(data as any)?.pedido) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
        <Text style={styles.errorTitle}>Pedido no encontrado</Text>
        <Button title="Volver a mis pedidos" onPress={() => router.back()} variant="primary" />
      </View>
    );
  }

  const pedido = (data as any).pedido;
  const subtotal = pedido.detalles.reduce((acc: number, det: any) => acc + (det.cantidad * det.precioUnitario), 0);
  const envio = pedido.total - subtotal;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header del Ticket */}
      <View style={styles.ticketHeader}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(pedido.estado) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(pedido.estado) }]}>{pedido.estado.toUpperCase()}</Text>
        </View>
        <Text style={styles.orderId}>Pedido #{pedido.idPedido}</Text>
        <Text style={styles.orderDate}>{formatDate(pedido.fechaPedido)}</Text>
      </View>

      {/* Lista de Productos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Artículos ({pedido.detalles.length})</Text>
        {pedido.detalles.map((detalle: any) => (
          <View key={detalle.idDetalle} style={styles.itemRow}>
            {detalle.producto.imagenUrl ? (
              <Image source={{ uri: detalle.producto.imagenUrl }} style={styles.itemImage} />
            ) : (
              <View style={styles.placeholderImage}><Ionicons name="image-outline" size={24} color={colors.text.tertiary} /></View>
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{detalle.producto.nombre}</Text>
              <Text style={styles.itemStore}>Vendido por: {detalle.producto.muebleria?.nombreNegocio}</Text>
              <View style={styles.itemPriceRow}>
                <Text style={styles.itemQty}>{detalle.cantidad}x {formatPrice(detalle.precioUnitario)}</Text>
                <Text style={styles.itemTotal}>{formatPrice(detalle.cantidad * detalle.precioUnitario)}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Resumen Financiero */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envío a {pedido.tipoEntrega}</Text>
          <Text style={styles.summaryValue}>{envio > 0 ? formatPrice(envio) : 'Gratis'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Pagado</Text>
          <Text style={styles.totalValue}>{formatPrice(pedido.total)}</Text>
        </View>
      </View>

      <Button title="Regresar" onPress={() => router.back()} variant="outline" style={styles.backButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  content: { padding: spacing.md },
  errorTitle: { ...typography.h3, color: colors.text.primary, marginTop: spacing.md, marginBottom: spacing.lg },
  ticketHeader: { alignItems: 'center', backgroundColor: colors.white, padding: spacing.xl, borderRadius: borderRadius.lg, marginBottom: spacing.md, ...shadows.sm },
  statusBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, marginBottom: spacing.sm },
  statusText: { ...typography.bodySmall, fontWeight: '700' },
  orderId: { ...typography.h2, color: colors.text.primary, marginBottom: spacing.xs },
  orderDate: { ...typography.body, color: colors.text.secondary },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  sectionTitle: { ...typography.h3, color: colors.text.primary, marginBottom: spacing.md },
  itemRow: { flexDirection: 'row', marginBottom: spacing.md, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  itemImage: { width: 60, height: 60, borderRadius: borderRadius.md, marginRight: spacing.md },
  placeholderImage: { width: 60, height: 60, borderRadius: borderRadius.md, backgroundColor: colors.primary[50], justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  itemInfo: { flex: 1 },
  itemName: { ...typography.body, fontWeight: '600', color: colors.text.primary },
  itemStore: { ...typography.caption, color: colors.text.tertiary, marginBottom: spacing.xs },
  itemPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  itemQty: { ...typography.bodySmall, color: colors.text.secondary },
  itemTotal: { ...typography.body, fontWeight: '600', color: colors.primary[700] },
  summaryCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.xl, ...shadows.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryLabel: { ...typography.body, color: colors.text.secondary },
  summaryValue: { ...typography.body, fontWeight: '500', color: colors.text.primary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  totalLabel: { ...typography.h3, color: colors.text.primary },
  totalValue: { ...typography.h2, color: colors.primary[700] },
  backButton: { marginBottom: spacing.xl },
});