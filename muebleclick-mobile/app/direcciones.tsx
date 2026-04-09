import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../src/theme';
import { Button, Input } from '../src/components';

// 1. Consulta Completa
const GET_MIS_DIRECCIONES = gql`
  query GetMisDirecciones {
    misDirecciones {
      idDireccion: id_direccion
      destinatario
      telefono
      calle
      numExterior: num_exterior
      numInterior: num_interior
      colonia
      codigoPostal: codigo_postal
      municipio
      estado
      referencias
    }
  }
`;

// 2. Mutación Completa
const CREAR_DIRECCION = gql`
  mutation CrearDireccion($input: CrearDireccionInput!) {
    crearDireccion(input: $input) {
      idDireccion: id_direccion
    }
  }
`;

export default function DireccionesScreen() {
  const router = useRouter();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados del formulario
  const [form, setForm] = useState({
    destinatario: '', telefono: '', codigo_postal: '', estado: '',
    municipio: '', colonia: '', calle: '', num_exterior: '',
    num_interior: '', referencias: ''
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const { data, loading } = useQuery(GET_MIS_DIRECCIONES, { fetchPolicy: 'cache-and-network' });

  const [crearDireccion, { loading: isCreating }] = useMutation(CREAR_DIRECCION, {
    refetchQueries: [{ query: GET_MIS_DIRECCIONES }],
    onCompleted: () => {
      Alert.alert('Éxito', 'Dirección agregada correctamente');
      setMostrarFormulario(false);
      setForm({ destinatario: '', telefono: '', codigo_postal: '', estado: '', municipio: '', colonia: '', calle: '', num_exterior: '', num_interior: '', referencias: '' });
    },
    onError: (err) => Alert.alert('Error', err.message),
  });

  const handleGuardar = () => {
    // Validación básica de campos obligatorios
    if (!form.destinatario || !form.telefono || !form.codigo_postal || !form.calle || !form.num_exterior || !form.colonia || !form.municipio || !form.estado) {
      Alert.alert('Atención', 'Por favor llena todos los campos obligatorios (*)');
      return;
    }

    crearDireccion({ variables: { input: form } });
  };

  if (loading && !data) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary[500]} /></View>;

  const direcciones = (data as any)?.misDirecciones || [];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} onPress={() => router.back()} />
        <Text style={styles.title}>Mis Direcciones</Text>
        <View style={{ width: 24 }} />
      </View>

      {!mostrarFormulario ? (
        <FlatList
          data={direcciones}
          keyExtractor={(item) => item.idDireccion.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="map-outline" size={64} color={colors.text.tertiary} />
              <Text style={styles.emptyText}>Aún no tienes direcciones guardadas</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name="location" size={24} color={colors.primary[500]} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardDestinatario}>{item.destinatario}</Text>
                <Text style={styles.cardSubtitle}>
                  {item.calle} {item.numExterior} {item.numInterior ? `Int. ${item.numInterior}` : ''}
                </Text>
                <Text style={styles.cardSubtitle}>Col. {item.colonia}, C.P. {item.codigoPostal}</Text>
                <Text style={styles.cardSubtitle}>{item.municipio}, {item.estado}</Text>
                <Text style={styles.cardPhone}><Ionicons name="call-outline" size={12}/> {item.telefono}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <Button title="Agregar Nueva Dirección" onPress={() => setMostrarFormulario(true)} variant="outline" icon={<Ionicons name="add" size={20} color={colors.primary[600]} />} style={{ marginTop: spacing.md }} />
          }
        />
      ) : (
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.formTitle}>Datos de Contacto</Text>
          <Input label="Nombre de quien recibe *" placeholder="Ej. Juan Pérez" value={form.destinatario} onChangeText={(v) => handleChange('destinatario', v)} />
          <Input label="Teléfono *" placeholder="A 10 dígitos" keyboardType="phone-pad" value={form.telefono} onChangeText={(v) => handleChange('telefono', v)} />

          <Text style={styles.formTitle}>Dirección</Text>
          <View style={styles.row}>
            <View style={styles.col}><Input label="Código Postal *" keyboardType="numeric" placeholder="Ej. 50000" value={form.codigo_postal} onChangeText={(v) => handleChange('codigo_postal', v)} /></View>
            <View style={styles.col}><Input label="Estado *" placeholder="Ej. Estado de México" value={form.estado} onChangeText={(v) => handleChange('estado', v)} /></View>
          </View>
          
          <Input label="Municipio / Alcaldía *" placeholder="Ej. Toluca" value={form.municipio} onChangeText={(v) => handleChange('municipio', v)} />
          <Input label="Colonia *" placeholder="Ej. San Pablo Autopan" value={form.colonia} onChangeText={(v) => handleChange('colonia', v)} />
          <Input label="Calle *" placeholder="Ej. Av. Independencia" value={form.calle} onChangeText={(v) => handleChange('calle', v)} />
          
          <View style={styles.row}>
            <View style={styles.col}><Input label="Núm. Exterior *" placeholder="Ej. 123" value={form.num_exterior} onChangeText={(v) => handleChange('num_exterior', v)} /></View>
            <View style={styles.col}><Input label="Núm. Interior" placeholder="Opcional" value={form.num_interior} onChangeText={(v) => handleChange('num_interior', v)} /></View>
          </View>

          <Input label="Referencias" placeholder="Ej. Casa blanca con zaguán negro, frente al parque..." multiline numberOfLines={3} value={form.referencias} onChangeText={(v) => handleChange('referencias', v)} />

          <View style={styles.buttonGroup}>
            <Button title="Guardar Dirección" onPress={handleGuardar} variant="primary" loading={isCreating} style={styles.saveBtn} />
            <Button title="Cancelar" onPress={() => setMostrarFormulario(false)} variant="outline" />
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, paddingTop: 60, backgroundColor: colors.white, borderBottomWidth: 1, borderColor: colors.border },
  title: { ...typography.h3, color: colors.text.primary },
  list: { padding: spacing.md },
  empty: { padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
  emptyText: { ...typography.body, color: colors.text.secondary, marginTop: spacing.md, textAlign: 'center' },
  card: { flexDirection: 'row', backgroundColor: colors.white, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.md, ...shadows.sm, borderWidth: 1, borderColor: colors.border },
  cardIcon: { marginRight: spacing.md, marginTop: spacing.xs },
  cardInfo: { flex: 1 },
  cardDestinatario: { ...typography.body, fontWeight: '600', color: colors.text.primary, marginBottom: spacing.xs },
  cardSubtitle: { ...typography.caption, color: colors.text.secondary, marginBottom: 2 },
  cardPhone: { ...typography.caption, color: colors.primary[600], fontWeight: '500', marginTop: spacing.xs },
  formContainer: { padding: spacing.md },
  formTitle: { ...typography.h3, color: colors.text.primary, marginTop: spacing.sm, marginBottom: spacing.md },
  row: { flexDirection: 'row', marginHorizontal: -spacing.xs },
  col: { flex: 1, paddingHorizontal: spacing.xs },
  buttonGroup: { marginTop: spacing.lg },
  saveBtn: { marginBottom: spacing.sm },
});