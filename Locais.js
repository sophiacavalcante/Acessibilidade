import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { AccessibilityContext } from './AccessibilityContext';
export default function Locais({ navigation }) {

  const {
    fontSize,
    altoContraste,
    modoDaltonico
  } = useContext(AccessibilityContext);

  const locais = [

    {
      id: 1,
      nome: 'Shopping Iguatemi',
      descricao: 'Rampa e banheiro acessível',
      latitude: -3.7446,
      longitude: -38.4897,
    },

    {
      id: 2,
      nome: 'RioMar Fortaleza',
      descricao: 'Elevador e vaga PcD',
      latitude: -3.7223,
      longitude: -38.4712,
    },

    {
      id: 3,
      nome: 'Beira Mar',
      descricao: 'Piso tátil e rampa',
      latitude: -3.7172,
      longitude: -38.5007,
    },

  ];

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Locais Acessíveis
      </Text>

      <MapView
        style={styles.map}

        initialRegion={{
          latitude: -3.7319,
          longitude: -38.5267,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >

        {locais.map((local) => (

          <Marker
            key={local.id}

            coordinate={{
              latitude: local.latitude,
              longitude: local.longitude,
            }}

            title={local.nome}
            description={local.descricao}
          />

        ))}

      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F5DFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  map: {
    flex: 1,
  },

});