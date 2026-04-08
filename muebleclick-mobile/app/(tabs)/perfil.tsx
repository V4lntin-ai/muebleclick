import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { useAuthStore } from '../../src/stores';
import { Button } from '../../src/components';
import { removeToken } from '../../src/services/api';

export default function PerfilScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesi\u00f3n',
      '\u00bfEst\u00e1s seguro de que deseas cerrar sesi\u00f3n?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesi\u00f3n',
          style: 'destructive',
          onPress: async () => {
            await removeToken();
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.guestContainer}>
        <View style={styles.guestHeader}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={48} color={colors.text.tertiary} />
          </View>
          <Text style={styles.guestTitle}>Bienvenido a MuebleClick</Text>
          <Text style={styles.guestSubtitle}>
            Inicia sesi\u00f3n para acceder a todas las funciones
          </Text>
        </View>

        <View style={styles.guestActions}>
          <Button
            title="Iniciar Sesi\u00f3n"
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="large"
            fullWidth
          />
          <Button
            title="Crear Cuenta"
            onPress={() => router.push('/(auth)/register')}
            variant="outline"
            size="large"
            fullWidth
          />
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Beneficios de crear una cuenta</Text>
          <View style={styles.benefitItem}>
            <Ionicons name="cart" size={20} color={colors.primary[500]} />
            <Text style={styles.benefitText}>Realiza pedidos f\u00e1cilmente</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="time" size={20} color={colors.primary[500]} />
            <Text style={styles.benefitText}>Historial de compras</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="star" size={20} color={colors.primary[500]} />
            <Text style={styles.benefitText}>Acumula puntos y descuentos</Text>
          </View>
        </View>
      </View>
    );
  }

  const menuItems = [
    {
      icon: 'document-text-outline',
      title: 'Mis Pedidos',
      subtitle: 'Historial y seguimiento',
      onPress: () => router.push('/(tabs)/pedidos'),
    },
    {
      icon: 'location-outline',
      title: 'Mis Direcciones',
      subtitle: 'Gestiona tus direcciones de env\u00edo',
      onPress: () => Alert.alert('Pr\u00f3ximamente', 'Esta funci\u00f3n estar\u00e1 disponible pronto'),
    },
    {
      icon: 'card-outline',
      title: 'M\u00e9todos de Pago',
      subtitle: 'Gestiona tus formas de pago',
      onPress: () => Alert.alert('Pr\u00f3ximamente', 'Esta funci\u00f3n estar\u00e1 disponible pronto'),
    },
    {
      icon: 'heart-outline',
      title: 'Favoritos',
      subtitle: 'Productos guardados',
      onPress: () => Alert.alert('Pr\u00f3ximamente', 'Esta funci\u00f3n estar\u00e1 disponible pronto'),
    },
    {
      icon: 'settings-outline',
      title: 'Configuraci\u00f3n',
      subtitle: 'Notificaciones y preferencias',
      onPress: () => Alert.alert('Pr\u00f3ximamente', 'Esta funci\u00f3n estar\u00e1 disponible pronto'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Ayuda',
      subtitle: 'Preguntas frecuentes y soporte',
      onPress: () => Alert.alert('Pr\u00f3ximamente', 'Esta funci\u00f3n estar\u00e1 disponible pronto'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {user.picture ? (
            <Image source={{ uri: user.picture }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user.nombre?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user.nombre}</Text>
        <Text style={styles.userEmail}>{user.correo}</Text>
        {user.cliente && (
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.pointsText}>
              {user.cliente.puntos || 0} puntos
            </Text>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemIcon}>
              <Ionicons
                name={item.icon as any}
                size={22}
                color={colors.primary[600]}
              />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          title="Cerrar Sesi\u00f3n"
          onPress={handleLogout}
          variant="outline"
          size="large"
          fullWidth
          icon={<Ionicons name="log-out-outline" size={20} color={colors.primary[500]} />}
        />
      </View>

      <Text style={styles.version}>Versi\u00f3n 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  guestContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  guestHeader: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  guestTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  guestSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  guestActions: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  benefitsContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  benefitsTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  benefitText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    ...shadows.sm,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h1,
    color: colors.primary[600],
  },
  userName: {
    ...typography.h3,
    color: colors.text.primary,
  },
  userEmail: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    backgroundColor: colors.secondary[100],
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  pointsText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.secondary[800],
  },
  menuContainer: {
    backgroundColor: colors.white,
    marginTop: spacing.lg,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuItemTitle: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text.primary,
  },
  menuItemSubtitle: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  logoutContainer: {
    padding: spacing.lg,
  },
  version: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
