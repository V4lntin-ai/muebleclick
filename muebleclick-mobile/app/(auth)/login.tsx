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
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

export default function LoginScreen() {
  const router = useRouter();
  const { login: storeLogin } = useAuthStore();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ correo?: string; password?: string }>({});

  const [loginBackend, { loading: isLoggingIn }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data: any) => {
      const token = data.login.access_token;
      const user = data.login.usuario;
      
      await AsyncStorage.setItem('userToken', token);
      // Guardamos el usuario en Zustand
      storeLogin(user, token);
      // Redirigimos
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    },
  });

  const validateForm = () => {
    const newErrors: { correo?: string; password?: string } = {};

    if (!correo) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      newErrors.correo = 'Correo inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    // Ejecutamos la mutación de Apollo
    loginBackend({ variables: { input: { correo, password } } });
  };

  const handleGoogleLogin = async () => {
    Alert.alert('Próximamente', 'La autenticación con Google está en construcción para el nuevo backend.');
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
            <Ionicons name="storefront" size={40} color={colors.primary[500]} />
          </View>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
            label="Contraseña"
            placeholder="Tu contraseña"
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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoggingIn}
            disabled={isLoggingIn}
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>o continúa con</Text>
            <View style={styles.divider} />
          </View>

          {/* Google Login */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={isLoggingIn}
          >
            <Ionicons name="logo-google" size={20} color={colors.text.primary} />
            <Text style={styles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... Mantén tus estilos exactos de styles = StyleSheet.create({...}) de tu archivo original ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, padding: spacing.lg },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  logoContainer: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary[50], alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  title: { ...typography.h2, color: colors.text.primary },
  subtitle: { ...typography.body, color: colors.text.secondary, marginTop: spacing.xs },
  form: { marginBottom: spacing.xl },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: spacing.lg },
  forgotPasswordText: { ...typography.bodySmall, color: colors.primary[600] },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.caption, color: colors.text.tertiary, marginHorizontal: spacing.md },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingVertical: spacing.md, gap: spacing.sm },
  googleButtonText: { ...typography.button, color: colors.text.primary },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto' },
  registerText: { ...typography.body, color: colors.text.secondary },
  registerLink: { ...typography.body, color: colors.primary[600], fontWeight: '600' },
});