import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { useAuthStore } from '../../src/stores';
import { Button } from '../../src/components';

// 🚨 Consulta GraphQL usando Alias
const GET_MIS_PEDIDOS = gql`
  query GetMisPedidos {
    misPedidos {
      idPedido: id_pedido
      total
      estado
      fechaPedido: fecha_pedido
      detalles {
        cantidad
        precioUnitario: precio_unitario
        producto {
          nombre
          imagenUrl: imagen_url
        }
      }
    }
  }
`;

export default function PedidosScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // 🚨 Hook de Apollo
  const { data, loading, refetch, error } = useQuery(GET_MIS_PEDIDOS, {
    skip: !isAuthenticated, // No ejecuta la consulta si no hay sesión
    fetchPolicy: 'cache-and-network',
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (isAuthenticated) await refetch();
    setRefreshing(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString) || dateString);
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'entregado': return colors.success;
      case 'enviado': return colors.info;
      case 'pagado': return colors.primary[500];
      default: return colors.warning; // pendiente
    }
  };

  // Si no está logueado
  if (!isAuthenticated) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="lock-closed-outline" size={64} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>Inicia sesión</Text>
        <Text style={styles.emptyText}>Debes iniciar sesión para ver tu historial de pedidos</Text>
        <Button title="Iniciar Sesión" onPress={() => router.push('/(auth)/login')} variant="primary" />
      </View>
    );
  }

  // Cargando
  if (loading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  const pedidos = (data as any)?.misPedidos || [];

  // Sin pedidos
  if (pedidos.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.emptyContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Ionicons name="receipt-outline" size={64} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>No tienes pedidos</Text>
        <Text style={styles.emptyText}>Aún no has realizado ninguna compra</Text>
        <Button title="Explorar Catálogo" onPress={() => router.push('/(tabs)/catalogo')} variant="primary" />
      </ScrollView>
    );
  }

  const renderPedido = ({ item }: { item: any }) => {
    const totalItems = item.detalles.reduce((acc: number, det: any) => acc + det.cantidad, 0);
    const primerProducto = item.detalles[0]?.producto;

    return (
      <TouchableOpacity 
        style={styles.pedidoCard}
        onPress={() => router.push(`/pedido/${item.idPedido}`)}
      >
        <View style={styles.pedidoHeader}>
          <Text style={styles.pedidoId}>Pedido #{item.idPedido}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estado) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.estado) }]}>{item.estado.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.pedidoBody}>
          <View style={styles.pedidoIcon}>
            <Ionicons name="cube-outline" size={24} color={colors.primary[500]} />
          </View>
          <View style={styles.pedidoInfo}>
            <Text style={styles.pedidoDate}>{formatDate(item.fechaPedido)}</Text>
            <Text style={styles.pedidoItems} numberOfLines={1}>
              {primerProducto?.nombre} {totalItems > 1 ? `y ${totalItems - 1} más...` : ''}
            </Text>
          </View>
          <View style={styles.pedidoTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(item.total)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.idPedido.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary[500]} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: spacing.md },
  pedidoCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm, borderWidth: 1, borderColor: colors.border },
  pedidoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  pedidoId: { ...typography.body, fontWeight: '600', color: colors.text.primary },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  statusText: { ...typography.caption, fontWeight: '700', fontSize: 10 },
  pedidoBody: { flexDirection: 'row', alignItems: 'center' },
  pedidoIcon: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.primary[50], justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  pedidoInfo: { flex: 1 },
  pedidoDate: { ...typography.caption, color: colors.text.tertiary, marginBottom: spacing.xs },
  pedidoItems: { ...typography.bodySmall, color: colors.text.secondary },
  pedidoTotal: { alignItems: 'flex-end', paddingLeft: spacing.md },
  totalLabel: { ...typography.caption, color: colors.text.tertiary, marginBottom: spacing.xs },
  totalValue: { ...typography.body, fontWeight: '600', color: colors.primary[700] },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  emptyTitle: { ...typography.h3, color: colors.text.primary, marginTop: spacing.lg, marginBottom: spacing.sm },
  emptyText: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.lg },
});