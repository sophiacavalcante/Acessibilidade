import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {

  const locais = [
    {
      id: 1,
      nome: 'RioMar Fortaleza',
      latitude: -3.7223,
      longitude: -38.4712,
    },

    {
      id: 2,
      nome: 'Shopping Iguatemi',
      latitude: -3.7446,
      longitude: -38.4897,
    },
  ];

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Mapa Acessível
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
    fontSize: 30,
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