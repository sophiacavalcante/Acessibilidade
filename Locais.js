import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OVERPASS_URL = 'https://overpass.kumi.systems/api/interpreter';

const buildQuery = () => `
  [out:json][timeout:25];
  (
    node["wheelchair"="yes"](-3.80,-38.60,-3.69,-38.44);
    node["wheelchair:toilet"="yes"](-3.80,-38.60,-3.69,-38.44);
  );
  out body;
`;

function formatDescricao(tags) {
  const partes = [];

  if (tags.wheelchair === 'yes')
    partes.push('Acessível para cadeirante');

  if (tags['wheelchair:toilet'] === 'yes')
    partes.push('Banheiro acessível');

  return partes.join(' • ') || 'Local acessível';
}

export default function Locais() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocais() {
      try {
        const response = await fetch(OVERPASS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(buildQuery())}`,
        });

        const data = await response.json();

        const locaisFormatados = data.elements
          .filter((el) => el.lat && el.lon)
          .map((el) => ({
            id: el.id,
            nome: el.tags?.name || 'Local acessível',
            descricao: formatDescricao(el.tags || {}),
            latitude: el.lat,
            longitude: el.lon,
          }));

        setLocais(locaisFormatados);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocais();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais Acessíveis</Text>

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
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  map: {
    flex: 1,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});