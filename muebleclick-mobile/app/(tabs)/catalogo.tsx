import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../src/theme';
import { ProductCard, Input } from '../../src/components';
import { useUIStore } from '../../src/stores';

const GET_PRODUCTOS = gql`
  query GetProductos($categoria: String, $search: String) {
    productos(categoria: $categoria, search: $search) {
      items {
        idProducto: id_producto
        nombre
        descripcion
        categoria
        precioVenta: precio_venta
        imagenUrl: imagen_url
      }
      total
    }
  }
`;

const GET_CATEGORIAS = gql`
  query GetCategorias {
    categorias {
      nombre
    }
  }
`;

export default function CatalogoScreen() {
  const router = useRouter();
  const { selectedCategoria, setSelectedCategoria, searchQuery, setSearchQuery } = useUIStore();
  
  const { data, loading: isLoading, error, refetch } = useQuery(GET_PRODUCTOS, {
    variables: { 
      categoria: selectedCategoria || null, 
      search: searchQuery || null 
    },
    fetchPolicy: 'cache-and-network'
  });
  if (error) {
    console.error("Error de Apollo:", error.message);
  } else {
    console.log("Datos de Apollo:", data);
  }

  const { data: categoriasData } = useQuery(GET_CATEGORIAS);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleCategoriaFilter = (cat: string | null) => {
    setSelectedCategoria(cat);
  };

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, [setSearchQuery]);

  const handleProductPress = (id: number) => {
    router.push(`/producto/${id}`);
  };

  const productos = (data as any)?.productos?.items || [];
  const categorias = (categoriasData as any)?.categorias || [];

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      producto={item}
      onPress={() => handleProductPress(item.idProducto)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search */}
      <Input
        placeholder="Buscar muebles..."
        value={searchQuery}
        onChangeText={handleSearch}
        leftIcon={<Ionicons name="search" size={20} color={colors.text.tertiary} />}
        containerStyle={styles.searchContainer}
      />

      {/* Categories Filter */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategoria && styles.categoryChipActive,
          ]}
          onPress={() => handleCategoriaFilter(null)}
        >
          <Text style={[styles.categoryChipText, !selectedCategoria && styles.categoryChipTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        {categorias.map((cat: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedCategoria === cat.nombre && styles.categoryChipActive,
            ]}
            onPress={() => handleCategoriaFilter(cat.nombre)}
          >
            <Text style={[styles.categoryChipText, selectedCategoria === cat.nombre && styles.categoryChipTextActive]}>
              {cat.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {(data as any)?.productos?.total || 0} productos encontrados
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading || productos.length === 0) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator color={colors.primary[500]} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={64} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>No hay productos</Text>
        <Text style={styles.emptyText}>
          {searchQuery
            ? 'No encontramos productos con tu búsqueda'
            : 'No hay productos en esta categoría'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderProduct}
        keyExtractor={(item) => item.idProducto.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary[500]} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  searchContainer: { marginBottom: spacing.sm },
  categoriesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  categoryChip: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: borderRadius.full, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  categoryChipActive: { backgroundColor: colors.primary[500], borderColor: colors.primary[500] },
  categoryChipText: { ...typography.bodySmall, color: colors.text.secondary },
  categoryChipTextActive: { color: colors.white, fontWeight: '600' },
  resultsCount: { ...typography.caption, color: colors.text.tertiary, marginBottom: spacing.md },
  listContent: { paddingBottom: spacing.xl },
  row: { justifyContent: 'space-between', paddingHorizontal: spacing.md },
  loadingFooter: { paddingVertical: spacing.lg, alignItems: 'center' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl },
  emptyTitle: { ...typography.h3, color: colors.text.primary, marginTop: spacing.md },
  emptyText: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.sm },
});