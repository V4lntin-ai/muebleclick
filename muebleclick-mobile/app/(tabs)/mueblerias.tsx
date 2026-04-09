import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../src/theme';

export default function MuebleriasScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="storefront-outline" size={80} color={colors.text.tertiary} />
      <Text style={styles.title}>Mueblerías</Text>
      <Text style={styles.subtitle}>Próximamente podrás ver las tiendas asociadas aquí.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  title: { ...typography.h2, color: colors.text.primary, marginTop: spacing.md },
  subtitle: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.sm },
});