import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
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

const GET_MIS_DIRECCIONES_CARRITO = gql`
  query GetMisDireccionesCarrito {
    misDirecciones {
      idDireccion: id_direccion
      calle
      numExterior: num_exterior
      colonia
      destinatario
    }
  }
`;

export default function CarritoScreen() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const [modalVisible, setModalVisible] = useState(false);

  const { data: dataDirecciones } = useQuery(GET_MIS_DIRECCIONES_CARRITO, {
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  });

  const [crearPedidoBackend, { loading: isCreatingPedido }] = useMutation(CREAR_PEDIDO_MUTATION, {
    onCompleted: (data: any) => {
      setModalVisible(false);
      if (data?.crearPedido?.success) {
        clearCart(); 
        Alert.alert('¡Pedido Creado!', 'Prepararemos tu envío lo más pronto posible.', [
          { text: 'Ver Pedido', onPress: () => router.push(`/pedido/${data.crearPedido.id}`) },
        ]);
      } else {
        Alert.alert('Error', data?.crearPedido?.message);
      }
    },
    onError: (error: any) => Alert.alert('Error', error.message),
  });

  const formatPrice = (price: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

  const subtotal = getTotal();
  const envio = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + envio;

  const handleCheckoutPress = () => {
    if (!isAuthenticated) {
      Alert.alert('Inicia sesión', 'Necesitas tu cuenta para comprar');
      return;
    }
    const direcciones = (dataDirecciones as any)?.misDirecciones || [];
    if (direcciones.length === 0) {
      Alert.alert('Falta dirección', 'Agrega una dirección de envío.');
      return;
    }
    setModalVisible(true);
  };

  const confirmarCompra = (idDireccionElegida: number) => {
    crearPedidoBackend({
      variables: {
        input: {
          items: items.map((item) => ({ idProducto: item.producto.idProducto, cantidad: item.cantidad })),
          tipoEntrega: 'domicilio',
          idDireccion: idDireccionElegida,
        }
      }
    });
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Button title="Explorar Catálogo" onPress={() => router.push('/(tabs)/catalogo')} variant="primary" style={{marginTop: spacing.md}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 🚨 BOTÓN DE EMERGENCIA: TÓCALO EN TU CELULAR PARA BORRAR LA MEMORIA CORRUPTA */}
        <TouchableOpacity 
          onPress={() => clearCart()} 
          style={{ backgroundColor: 'red', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>🚨 VACIAR MEMORIA DEL CARRITO 🚨</Text>
        </TouchableOpacity>

        <View style={styles.itemsContainer}>
          {items.map((item, index) => (
            <CartItem key={`cart-item-${item.producto?.idProducto || 'fantasma'}-${index}`} item={item} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Envío</Text><Text style={[styles.summaryValue, envio === 0 && styles.freeShipping]}>{envio === 0 ? 'Gratis' : formatPrice(envio)}</Text></View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{formatPrice(total)}</Text></View>
        
        <Button
          title={isAuthenticated ? 'Proceder al Pago' : 'Iniciar Sesión'}
          onPress={handleCheckoutPress}
          variant="primary" size="large" fullWidth
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
});