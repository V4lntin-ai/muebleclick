import React from 'react';
import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client/react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { client } from '../src/services/apollo'; 
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTintColor: colors.primary[700],
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ title: 'Iniciar Sesión', presentation: 'modal' }} />
          <Stack.Screen name="(auth)/register" options={{ title: 'Crear Cuenta', presentation: 'modal' }} />
          <Stack.Screen name="producto/[id]" options={{ title: 'Detalle del Producto' }} />
          <Stack.Screen name="pedido/[id]" options={{ title: 'Detalle del Pedido' }} />
        </Stack>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});