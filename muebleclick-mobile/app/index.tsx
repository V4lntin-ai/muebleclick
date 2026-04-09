import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../src/theme';
import { useAuthStore } from '../src/stores';
import { Button } from '../src/components';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
      
      if (isAuthenticated) {
        router.replace('/(tabs)');
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="storefront" size={60} color={colors.primary[500]} />
        </View>
        <Text style={styles.title}>MuebleClick</Text>
        <Text style={styles.subtitle}>Tu marketplace de muebles favorito</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="cube-outline" size={24} color={colors.primary[600]} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Catálogo Extenso</Text>
            <Text style={styles.featureDesc}>Miles de muebles de calidad</Text>
          </View>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="car-outline" size={24} color={colors.primary[600]} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Envío a Domicilio</Text>
            <Text style={styles.featureDesc}>Entrega segura y rápida</Text>
          </View>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary[600]} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Compra Segura</Text>
            <Text style={styles.featureDesc}>Garantía en todos los productos</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Explorar Catalogo"
          onPress={() => router.push('/(tabs)')}
          variant="primary"
          size="large"
          fullWidth
          icon={<Ionicons name="grid-outline" size={20} color={colors.white} />}
        />
        <View style={styles.authButtons}>
          <Button
            title="Iniciar Sesion"
            onPress={() => router.push('/(auth)/login')}
            variant="outline"
            size="medium"
            style={styles.authButton}
          />
          <Button
            title="Crear Cuenta"
            onPress={() => router.push('/(auth)/register')}
            variant="ghost"
            size="medium"
            style={styles.authButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primary[700],
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  featuresContainer: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  featureDesc: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  authButton: {
    flex: 1,
  },
});
