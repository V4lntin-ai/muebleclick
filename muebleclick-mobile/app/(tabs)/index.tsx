import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Tabs } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { ProductCard } from '../../src/components';
import { useAuthStore } from '../../src/stores';

const { width } = Dimensions.get('window');

const GET_PRODUCTOS_HOME = gql`
  query GetProductosHome {
    productos {
      items {
        idProducto: id_producto
        nombre
        precioVenta: precio_venta
        imagenUrl: imagen_url
        categoria
      }
    }
  }
`;

const GET_MIS_DIRECCIONES_HOME = gql`
  query GetMisDireccionesHome {
    misDirecciones {
      idDireccion: id_direccion
      codigoPostal: codigo_postal
    }
  }
`;

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const { data: dataProductos, loading: loadingProductos } = useQuery(GET_PRODUCTOS_HOME, {
    fetchPolicy: 'cache-first',
  });

  const { data: dataDir } = useQuery(GET_MIS_DIRECCIONES_HOME, {
    skip: !isAuthenticated,
    fetchPolicy: 'cache-first',
  });

  const productos = (dataProductos as any)?.productos?.items || [];
  const direcciones = (dataDir as any)?.misDirecciones || [];
  
  const nombreUsuario = isAuthenticated ? user?.nombre?.split(' ')[0] : 'bienvenido';
  const cpDinamico = direcciones.length > 0 ? direcciones[0].codigoPostal : 'Ingresa tu CP';

  const QuickLink = ({ icon, label, color }: { icon: any, label: string, color: string }) => (
    <TouchableOpacity style={styles.quickLinkContainer} onPress={() => router.push('/(tabs)/catalogo')}>
      <View style={[styles.quickLinkCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color={colors.primary[700]} />
      </View>
      <Text style={styles.quickLinkLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Tabs.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.searchBar} 
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/catalogo')}
          >
            <Ionicons name="search" size={20} color={colors.text.tertiary} style={styles.searchIcon} />
            <Text style={styles.searchText}>Buscar en MuebleClick</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.notifButton} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={26} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerBottom}>
          <Text style={styles.greeting}>Hola, {nombreUsuario} 👋</Text>
          
          <TouchableOpacity style={styles.locationButton} onPress={() => router.push('/direcciones')}>
            <Ionicons name="location-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.locationText}>CP {cpDinamico}</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.bannerCard} activeOpacity={0.9}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerBadge}>OFERTA DE PRIMAVERA</Text>
            <Text style={styles.bannerTitle}>Renueva tu espacio</Text>
            <Text style={styles.bannerSubtitle}>Hasta 30% de descuento en salas y comedores seleccionados.</Text>
          </View>
          <Ionicons name="home-outline" size={80} color="rgba(255,255,255,0.2)" style={styles.bannerIcon} />
        </TouchableOpacity>

        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickLinksScroll}>
            <QuickLink icon="bed-outline" label="Recámaras" color="#E8F3FF" />
            <QuickLink icon="tv-outline" label="Salas" color="#FFF0E6" />
            <QuickLink icon="restaurant-outline" label="Comedores" color="#E6F9EC" />
            <QuickLink icon="desktop-outline" label="Oficinas" color="#F3E8FF" />
            <QuickLink icon="grid-outline" label="Ver todo" color={colors.background} />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Descubre lo más vendido</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/catalogo')}>
              <Text style={styles.seeAllText}>Ver más</Text>
            </TouchableOpacity>
          </View>

          {loadingProductos ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary[500]} />
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsScroll}>
              {productos.slice(0, 5).map((producto: any) => (
                <View key={producto.idProducto} style={styles.productWrapper}>
                  <ProductCard 
                    producto={producto} 
                    onPress={() => router.push(`/producto/${producto.idProducto}`)} 
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Ionicons name="shield-checkmark-outline" size={32} color={colors.primary[500]} />
            <Text style={styles.benefitTitle}>Compra Segura</Text>
            <Text style={styles.benefitText}>Tus datos están protegidos</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="cube-outline" size={32} color={colors.primary[500]} />
            <Text style={styles.benefitTitle}>Envío Rápido</Text>
            <Text style={styles.benefitText}>A la puerta de tu casa</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 40 },
  
  header: { 
    backgroundColor: colors.white, 
    paddingHorizontal: spacing.md, 
    paddingTop: spacing.sm, 
    paddingBottom: spacing.sm, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  headerTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: spacing.sm 
  },
  searchBar: { 
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.background,
    borderRadius: borderRadius.full, 
    paddingHorizontal: spacing.md, 
    height: 44,
    marginRight: spacing.md 
  },
  searchIcon: { marginRight: spacing.sm },
  searchText: { ...typography.body, color: colors.text.tertiary },
  notifButton: { padding: 4 },
  
  headerBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: spacing.xs
  },
  greeting: { ...typography.body, fontWeight: '600', color: colors.text.primary },
  locationButton: { flexDirection: 'row', alignItems: 'center' },
  locationText: { ...typography.caption, color: colors.text.secondary, marginHorizontal: 4 },

  bannerCard: { margin: spacing.md, backgroundColor: colors.primary[600], borderRadius: borderRadius.lg, padding: spacing.xl, flexDirection: 'row', overflow: 'hidden', ...shadows.md },
  bannerContent: { flex: 1, zIndex: 1 },
  bannerBadge: { color: colors.white, fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: spacing.sm },
  bannerTitle: { ...typography.h1, color: colors.white, marginBottom: spacing.xs },
  bannerSubtitle: { ...typography.bodySmall, color: 'rgba(255,255,255,0.9)' },
  bannerIcon: { position: 'absolute', right: -10, bottom: -15, transform: [{ rotate: '-15deg' }] },

  section: { marginTop: spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.text.primary },
  seeAllText: { ...typography.bodySmall, color: colors.primary[600], fontWeight: '600' },

  quickLinksScroll: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  quickLinkContainer: { alignItems: 'center', marginRight: spacing.lg },
  quickLinkCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
  quickLinkLabel: { ...typography.caption, color: colors.text.primary, fontWeight: '500' },

  loadingContainer: { height: 200, justifyContent: 'center', alignItems: 'center' },
  productsScroll: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  productWrapper: { width: width * 0.45, marginRight: spacing.md },

  benefitsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.white, margin: spacing.md, padding: spacing.lg, borderRadius: borderRadius.lg, ...shadows.sm },
  benefitItem: { alignItems: 'center', flex: 1 },
  benefitTitle: { ...typography.bodySmall, fontWeight: '700', color: colors.text.primary, marginTop: spacing.xs, marginBottom: 2 },
  benefitText: { fontSize: 10, color: colors.text.secondary, textAlign: 'center' },
});