import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../src/theme';
import { Input, Button } from '../../src/components';
import { useAuthStore } from '../../src/stores';

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      usuario {
        id_usuario
        nombre
        correo
        role_id
      }
    }
  }
`;

export default function RegisterScreen() {
  const router = useRouter();
  const { login: storeLogin } = useAuthStore();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [registerBackend, { loading: isRegistering }] = useMutation(REGISTER_MUTATION, {
    onCompleted: async (data: any) => {
      const token = data.register.access_token;
      const user = data.register.usuario;

      await AsyncStorage.setItem('userToken', token);
      storeLogin(user, token);

      Alert.alert(
        '¡Bienvenido!',
        'Tu cuenta ha sido creada exitosamente',
        [{ text: 'Continuar', onPress: () => router.replace('/(tabs)') }]
      );
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Error al crear cuenta');
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!correo) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      newErrors.correo = 'Correo inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    registerBackend({ variables: { input: { nombre, correo, password } } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="person-add" size={40} color={colors.primary[500]} />
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nombre completo"
            placeholder="Tu nombre"
            value={nombre}
            onChangeText={setNombre}
            error={errors.nombre}
            leftIcon={<Ionicons name="person-outline" size={20} color={colors.text.tertiary} />}
          />

          <Input
            label="Correo electrónico"
            placeholder="tu@correo.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.correo}
            leftIcon={<Ionicons name="mail-outline" size={20} color={colors.text.tertiary} />}
          />

          <Input
            label="Teléfono (opcional)"
            placeholder="10 dígitos"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={20} color={colors.text.tertiary} />}
          />

          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.text.tertiary}
                />
              </TouchableOpacity>
            }
          />

          <Input
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            error={errors.confirmPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} />}
          />

          <Button
            title="Crear Cuenta"
            onPress={handleRegister}
            variant="primary"
            size="large"
            fullWidth
            loading={isRegistering}
            style={styles.submitButton}
          />

          {/* Terms */}
          <Text style={styles.termsText}>
            Al registrarte, aceptas nuestros{' '}
            <Text style={styles.termsLink}>Términos de Servicio</Text> y{' '}
            <Text style={styles.termsLink}>Política de Privacidad</Text>
          </Text>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... Tus mismos estilos del archivo original ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, padding: spacing.lg },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  logoContainer: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary[50], alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  title: { ...typography.h2, color: colors.text.primary },
  subtitle: { ...typography.body, color: colors.text.secondary, marginTop: spacing.xs },
  form: { marginBottom: spacing.xl },
  submitButton: { marginTop: spacing.md },
  termsText: { ...typography.caption, color: colors.text.tertiary, textAlign: 'center', marginTop: spacing.md },
  termsLink: { color: colors.primary[600] },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto' },
  loginText: { ...typography.body, color: colors.text.secondary },
  loginLink: { ...typography.body, color: colors.primary[600], fontWeight: '600' },
});