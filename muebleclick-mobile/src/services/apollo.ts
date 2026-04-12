import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ipCasa = '192.168.1.71';
const ipUniversidad = '10.53.33.47';
const ipWeb = 'localhost';

const entornoActual = 'web'; 

const ipActiva = entornoActual === 'web' 
? ipWeb : ipUniversidad;

const httpLink = createHttpLink({
  uri: `http://${ipActiva}:3000/graphql`, 
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});