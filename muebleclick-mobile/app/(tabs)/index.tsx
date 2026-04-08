import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { api } from '../../src/services/api';
import { ProductCard } from '../../src/components';
import { useUIStore } from '../../src/stores';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { setSelectedCategoria } = useUIStore();

  const { data: productosData, isLoading: loadingProductos, refetch: refetchProductos } = useQuery({
    queryKey: ['productos', 1, 6],
    queryFn: () => api.getProductos(1, 6),
  });

  const { data: categoriasData } = useQuery({
    queryKey: ['categorias'],
    queryFn: () => api.getCategorias(),
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchProductos();
    setRefreshing(false);
  };

  const handleCategoriaPress = (categoria: string) => {
    setSelectedCategoria(categoria);
    router.push('/(tabs)/catalogo');
  };

  const handleProductPress = (id: number) => {
    router.push(`/producto/${id}`);
  };

  const categorias = categoriasData?.categorias || [];
  const productos = productosData?.productos?.items || [];

  if (loadingProductos && !productos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary[500]}
        />
      }
    >
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Renueva tu hogar</Text>
          <Text style={styles.heroSubtitle}>
            Descubre muebles de calidad al mejor precio
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/(tabs)/catalogo')}
          >
            <Text style={styles.heroButtonText}>Ver Cat\u00e1logo</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.heroImageContainer}>
          <Ionicons name="home" size={80} color={colors.primary[200]} />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categor\u00edas</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/catalogo')}>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categorias.map((cat: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => handleCategoriaPress(cat.nombre)}
            >
              <View style={styles.categoryIcon}>
                <Ionicons
                  name={getCategoryIcon(cat.nombre)}
                  size={24}
                  color={colors.primary[600]}
                />
              </View>
              <Text style={styles.categoryName}>{cat.nombre}</Text>
              <Text style={styles.categoryCount}>{cat.cantidad} productos</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos Destacados</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/catalogo')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productsGrid}>
          {productos.map((producto: any) => (
            <ProductCard
              key={producto.idProducto}
              producto={producto}
              onPress={() => handleProductPress(producto.idProducto)}
            />
          ))}
        </View>
      </View>

      {/* Promo Banner */}
      <TouchableOpacity style={styles.promoBanner}>
        <View>
          <Text style={styles.promoTitle}>\u00a1Env\u00edo Gratis!</Text>
          <Text style={styles.promoSubtitle}>En compras mayores a $5,000</Text>
        </View>
        <Ionicons name="gift" size={40} color={colors.secondary[600]} />
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const getCategoryIcon = (categoria: string): any => {
  const icons: Record<string, string> = {
    'Salas': 'tv-outline',
    'Comedores': 'restaurant-outline',
    'Rec\u00e1maras': 'bed-outline',
    'Oficina': 'desktop-outline',
    'Libreros': 'library-outline',
  };
  return icons[categoria] || 'cube-outline';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  heroBanner: {
    flexDirection: 'row',
    backgroundColor: colors.primary[500],
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    ...typography.bodySmall,
    color: colors.primary[100],
    marginBottom: spacing.md,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  heroButtonText: {
    ...typography.button,
    color: colors.primary[600],
    fontSize: 14,
  },
  heroImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  seeAll: {
    ...typography.bodySmall,
    color: colors.primary[600],
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingRight: spacing.md,
    gap: spacing.md,
  },
  categoryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    width: 100,
    ...shadows.sm,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  categoryCount: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary[100],
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.secondary[300],
  },
  promoTitle: {
    ...typography.h3,
    color: colors.secondary[800],
  },
  promoSubtitle: {
    ...typography.bodySmall,
    color: colors.secondary[700],
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
