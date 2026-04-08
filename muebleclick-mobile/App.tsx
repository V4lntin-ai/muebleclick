import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView } from 'react-native';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.1.71:3000/graphql' }),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#111827' }}>MuebleClick</Text>
        <Text style={{ fontSize: 16, color: '#4B5563', marginTop: 8 }}>Ecosistema listo 🚀</Text>
      </View>
    </SafeAreaView>
  );
}

// 3. Proveedor principal
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}