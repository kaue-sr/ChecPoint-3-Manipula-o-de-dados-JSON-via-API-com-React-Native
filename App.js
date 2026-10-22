import { NavigationContainer } from '@react-navigation/native'; // gerencia a navegação do app
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // cria a pilha de telas
import ListaScreen from './screens/ListaScreen';
import DetalheScreen from './screens/DetalheScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={ListaScreen} />
        <Stack.Screen name="Detalhe" component={DetalheScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}