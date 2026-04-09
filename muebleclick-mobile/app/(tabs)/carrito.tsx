import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { useCartStore, useAuthStore } from '../../src/stores';
import { CartItem, Button } from '../../src/components';

const CREAR_PEDIDO_MUTATION = gql`
  mutation CrearPedido($input: CrearPedidoInput!) {
    crearPedido(input: $input) {
      success
      message
      id
    }
  }
`;

export default function CarritoScreen() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [crearPedidoBackend, { loading: isCreatingPedido }] = useMutation(CREAR_PEDIDO_MUTATION, {
    onCompleted: (data: any) => {
      if (data?.crearPedido?.success) {
        // Vaciamos el carrito de Zustand porque ya se compró
        clearCart(); 
        Alert.alert(
          '¡Pedido Creado!',
          data.crearPedido.message || 'Tu pedido ha sido procesado exitosamente',
          [
            {
              text: 'Ver Pedido',
              onPress: () => router.push(`/pedido/${data.crearPedido.id}`),
            },
          ]
        );
      } else {
        Alert.alert('Error', data?.crearPedido?.message || 'Error al crear pedido');
      }
    },
    onError: (error: any) => {
      Alert.alert('Error de Seguridad', error.message || 'Inicia sesión nuevamente para comprar');
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Iniciar Sesión',
        'Necesitas iniciar sesión para realizar un pedido',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar Sesión', onPress: () => router.push('/(auth)/login') },
        ]
      );
      return;
    }

    crearPedidoBackend({
      variables: {
        input: {
          items: items.map((item) => ({
            idProducto: item.producto.idProducto,
            cantidad: item.cantidad,
          })),
          tipoEntrega: 'domicilio',
        }
      }
    });
  };

  const subtotal = getTotal();
  const envio = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + envio;

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyText}>
          Explora nuestro catálogo y encuentra los muebles perfectos para ti
        </Text>
        <Button
          title="Explorar Catálogo"
          onPress={() => router.push('/(tabs)/catalogo')}
          variant="primary"
          style={styles.exploreButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </Text>
          {items.map((item) => (
            <CartItem key={item.producto.idProducto} item={item} />
          ))}
        </View>

        {/* Promo */}
        {subtotal < 5000 && (
          <View style={styles.promoCard}>
            <Ionicons name="gift-outline" size={24} color={colors.primary[600]} />
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>¡Envío gratis!</Text>
              <Text style={styles.promoDesc}>
                Agrega {formatPrice(5000 - subtotal)} más para envío gratis
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envío</Text>
          <Text style={[styles.summaryValue, envio === 0 && styles.freeShipping]}>
            {envio === 0 ? 'Gratis' : formatPrice(envio)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <Button
          title={isAuthenticated ? 'Proceder al Pago' : 'Iniciar Sesión para Comprar'}
          onPress={handleCheckout}
          variant="primary"
          size="large"
          fullWidth
          loading={isCreatingPedido}
          icon={<Ionicons name={isAuthenticated ? "card-outline" : "log-in-outline"} size={20} color={colors.white} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: spacing.md },
  itemsContainer: { marginBottom: spacing.md },
  sectionTitle: { ...typography.body, fontWeight: '600', color: colors.text.primary, marginBottom: spacing.md },
  promoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary[50], padding: spacing.md, borderRadius: borderRadius.lg, gap: spacing.md, borderWidth: 1, borderColor: colors.primary[200] },
  promoText: { flex: 1 },
  promoTitle: { ...typography.body, fontWeight: '600', color: colors.primary[700] },
  promoDesc: { ...typography.caption, color: colors.primary[600] },
  summaryContainer: { backgroundColor: colors.white, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, ...shadows.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  summaryLabel: { ...typography.body, color: colors.text.secondary },
  summaryValue: { ...typography.body, fontWeight: '500', color: colors.text.primary },
  freeShipping: { color: colors.success, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.md },
  totalLabel: { ...typography.h3, color: colors.text.primary },
  totalValue: { ...typography.h2, color: colors.primary[700] },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyTitle: { ...typography.h2, color: colors.text.primary, marginTop: spacing.lg },
  emptyText: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.lg },
  exploreButton: { marginTop: spacing.md },
});