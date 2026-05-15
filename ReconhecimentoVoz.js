import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReconhecimentoVoz({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reconhecimento de Voz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F5DFF',
  },
});