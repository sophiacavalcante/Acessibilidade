import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Libras({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Libras</Text>
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