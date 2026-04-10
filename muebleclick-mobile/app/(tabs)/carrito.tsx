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
  
  // Estado para controlar la ventana de direcciones
  const [modalVisible, setModalVisible] = useState(false);

  // Traemos las direcciones
  const { data: dataDirecciones } = useQuery(GET_MIS_DIRECCIONES_CARRITO, {
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  });

  const [crearPedidoBackend, { loading: isCreatingPedido }] = useMutation(CREAR_PEDIDO_MUTATION, {
    onCompleted: (data: any) => {
      setModalVisible(false); // Cerramos el modal
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

  // Lógica al presionar "Proceder al Pago"
  const handleCheckoutPress = () => {
    if (!isAuthenticated) {
      Alert.alert('Inicia sesión', 'Necesitas tu cuenta para comprar', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ir', onPress: () => router.push('/(auth)/login') },
      ]);
      return;
    }

    const direcciones = (dataDirecciones as any)?.misDirecciones || [];
    
    if (direcciones.length === 0) {
      Alert.alert('Falta dirección', 'Agrega una dirección de envío para poder entregarte tus muebles.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Agregar Dirección', onPress: () => router.push('/direcciones') },
      ]);
      return;
    }

    setModalVisible(true);
  };

  // Lógica al elegir una dirección final
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
        <View style={styles.itemsContainer}>
          {items.map((item) => <CartItem key={item.producto.idProducto} item={item} />)}
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

      {/* Modal Selector de Direcciones */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Elige una dirección de entrega</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              {(dataDirecciones as any)?.misDirecciones.map((dir: any) => (
                <TouchableOpacity 
                  key={dir.idDireccion} 
                  style={styles.addressCard} 
                  onPress={() => confirmarCompra(dir.idDireccion)}
                  disabled={isCreatingPedido}
                >
                  <Ionicons name="location-outline" size={24} color={colors.primary[600]} style={{ marginRight: spacing.md }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addressName}>{dir.destinatario}</Text>
                    <Text style={styles.addressText}>{dir.calle} {dir.numExterior}, Col. {dir.colonia}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.white, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  modalTitle: { ...typography.h3, color: colors.text.primary },
  addressCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.background, borderRadius: borderRadius.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  addressName: { ...typography.body, fontWeight: '600', color: colors.text.primary },
  addressText: { ...typography.caption, color: colors.text.secondary, marginTop: 2 },
});