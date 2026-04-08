import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/stores';
import { Button } from '../../src/components';
import { Pedido } from '../../src/types';

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pendiente: colors.warning,
    confirmado: colors.info,
    en_proceso: colors.info,
    enviado: colors.primary[500],
    entregado: colors.success,
    cancelado: colors.error,
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
  };
  return labels[status] || status;
};

export default function PedidosScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['misPedidos'],
    queryFn: () => api.getMisPedidos(),
    enabled: isAuthenticated,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
      month: 'short',
      year: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-text-outline" size={80} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>Inicia sesi\u00f3n</Text>
        <Text style={styles.emptyText}>
          Para ver tus pedidos necesitas iniciar sesi\u00f3n
        </Text>
        <Button
          title="Iniciar Sesi\u00f3n"
          onPress={() => router.push('/(auth)/login')}
          variant="primary"
          style={styles.loginButton}
        />
      </View>
    );
  }

  if (isLoading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  const pedidos = data?.misPedidos || [];

  const renderPedido = ({ item }: { item: Pedido }) => (
    <TouchableOpacity
      style={styles.pedidoCard}
      onPress={() => router.push(`/pedido/${item.idPedido}`)}
      activeOpacity={0.7}
    >
      <View style={styles.pedidoHeader}>
        <View>
          <Text style={styles.pedidoId}>Pedido #{item.idPedido}</Text>
          <Text style={styles.pedidoDate}>{formatDate(item.fechaPedido)}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.estadoPedido) + '20' },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.estadoPedido) },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.estadoPedido) },
            ]}
          >
            {getStatusLabel(item.estadoPedido)}
          </Text>
        </View>
      </View>

      <View style={styles.pedidoBody}>
        <View style={styles.infoRow}>
          <Ionicons name="car-outline" size={16} color={colors.text.tertiary} />
          <Text style={styles.infoText}>
            {item.tipoEntrega === 'domicilio' ? 'Env\u00edo a domicilio' : 'Recoger en tienda'}
          </Text>
        </View>
        {item.direccion && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={colors.text.tertiary} />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.direccion.calleNumero}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.pedidoFooter}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{formatPrice(item.total)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>Sin pedidos</Text>
      <Text style={styles.emptyText}>
        A\u00fan no has realizado ning\u00fan pedido
      </Text>
      <Button
        title="Explorar Cat\u00e1logo"
        onPress={() => router.push('/(tabs)/catalogo')}
        variant="primary"
        style={styles.loginButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.idPedido.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
  pedidoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  pedidoId: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  pedidoDate: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: 2,
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
  pedidoBody: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  pedidoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  totalLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary[700],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  loginButton: {
    marginTop: spacing.lg,
  },
});
