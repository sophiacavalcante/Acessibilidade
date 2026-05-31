import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

// IMPORTAR O PROVIDER
import { ConfigProvider } from './Config';

// Importação das telas
import Telacadastro from './Telacadastro';
import Telalogin from './Telalogin';
import Telainfo from './Telainfo';
import Telasenha from './Telasenha';

import Recursos from './RecursosAcessi';

import LeitorTexto from './LeitorTexto';
import Locais from './Locais';
import ReconhecimentoVoz from './ReconhecimentoVoz';
import Suporte from './Suporte';
import { AccessibilityProvider } from './AccessibilityContext';

// IMPORTAR A TELA CONFIG NORMAL
import TelaConfig from './TelaConfig';

// Criação do Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <AccessibilityProvider>
     <ConfigProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Telainfo}
          />

          <Stack.Screen
            name="Cadastro"
            component={Telacadastro}
          />

          <Stack.Screen
            name="Login"
            component={Telalogin}
          />

          <Stack.Screen
            name="Senha"
            component={Telasenha}
          />

          <Stack.Screen
            name="Recursos"
            component={Recursos}
          />

          <Stack.Screen
            name="Config"
              component={TelaConfig}
          />

          <Stack.Screen
            name="LeitorTexto"
            component={LeitorTexto}
          />

          <Stack.Screen
            name="Locais"
            component={Locais}
          />

          <Stack.Screen
            name="ReconhecimentoVoz"
            component={ReconhecimentoVoz}
          />

          <Stack.Screen
            name="Suporte"
            component={Suporte}
          />
        </Stack.Navigator>
            </NavigationContainer>
            </ConfigProvider>
            </AccessibilityProvider>
  );
}