import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../src/theme';
import { useAuthStore } from '../../src/stores';

const GET_PERFIL_COMPLETO = gql`
  query GetPerfilCompleto {
    perfil {
      idUsuario: id_usuario
      nombre
      correo
    }
  }
`;

export default function PerfilScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const { data, loading } = useQuery(GET_PERFIL_COMPLETO, {
    skip: !isAuthenticated,
    fetchPolicy: 'cache-first',
  });

  const SettingsItem = ({ icon, title, onPress }: { icon: any, title: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={22} color={colors.text.secondary} style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary[500]} /></View>;
  const usuario = (data as any)?.perfil;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tarjeta de Identidad */}
      <View style={styles.identityCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{usuario?.nombre?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{usuario?.nombre}</Text>
        <Text style={styles.email}>{usuario?.correo}</Text>
      </View>

      {/* Bloque 1 */}
      <View style={styles.section}>
        <SettingsItem icon="person-outline" title="Información personal" onPress={() => {}} />
        <SettingsItem icon="id-card-outline" title="Datos de tu cuenta" onPress={() => {}} />
        <SettingsItem icon="shield-checkmark-outline" title="Seguridad" onPress={() => {}} />
      </View>

      {/* Bloque 2 */}
      <View style={styles.section}>
        <SettingsItem icon="card-outline" title="Tarjetas" onPress={() => {}} />
        {/* 🚨 Conectamos el botón de Direcciones que hicimos hace rato */}
        <SettingsItem icon="location-outline" title="Direcciones" onPress={() => router.push('/direcciones')} />
        <SettingsItem icon="lock-closed-outline" title="Privacidad" onPress={() => {}} />
        <SettingsItem icon="mail-outline" title="Comunicaciones" onPress={() => {}} />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  identityCard: { alignItems: 'flex-start', padding: spacing.xl, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatarContainer: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.primary[500], justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  avatarText: { ...typography.h1, color: colors.white },
  name: { ...typography.h2, color: colors.text.primary, marginBottom: 2 },
  email: { ...typography.body, color: colors.text.secondary },
  section: { backgroundColor: colors.white, marginTop: spacing.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.background },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: spacing.md },
  menuText: { ...typography.body, color: colors.text.primary },
});