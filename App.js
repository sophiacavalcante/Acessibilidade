import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Importação das telas
import Telacadastro from './Telacadastro';
import Telalogin from './Telalogin';
import Telainfo from './Telainfo';
import Telasenha from './Telasenha';
import Recursos from './RecursosAcessi';
import LeitorTexto from './LeitorTexto';
import Libras from './Libras';
import Locais from './Locais';
import NavegacaoAssistida from './NavegacaoAssistida';
import ReconhecimentoVoz from './ReconhecimentoVoz';
import Suporte from './Suporte';
import Config from './Config';
import Mapa from './Mapa';
import { AccessibilityProvider } from './AccessibilityContext';

// Criação do Stack Navigator
const Stack = createStackNavigator();
export default function App() {
 return (
 <AccessibilityProvider>
  <NavigationContainer>
 <Stack.Navigator initialRouteName="Recursos">
 <Stack.Screen name="Home" component={Telainfo} />
 <Stack.Screen name="Cadastro" component={Telacadastro} />
 <Stack.Screen name="Login" component={Telalogin} />
 <Stack.Screen name="Senha" component={Telasenha} />

 <Stack.Screen name="Recursos" component={Recursos} />
 <Stack.Screen name="Config" component={Config} />

 <Stack.Screen name="LeitorTexto" component={LeitorTexto} />
 <Stack.Screen name="Libras" component={Libras} />
 <Stack.Screen name="Locais" component={Locais} />
 <Stack.Screen name="NavegacaoAssistida" component={NavegacaoAssistida} />
 <Stack.Screen name="ReconhecimentoVoz" component={ReconhecimentoVoz} />
 <Stack.Screen name="Suporte" component={Suporte} />
 <Stack.Screen name="Mapa" component={Mapa} />

 </Stack.Navigator>
 </NavigationContainer>
</AccessibilityProvider>
 );
}