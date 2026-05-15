import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function App({navigation}) {
  return (
    <View style={styles.container}>

      {/* ILUSTRAÇÃO */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10629/10629340.png' }}
        style={styles.image}
      />

      {/* TEXTO */}
      <Text style={styles.smallText}>Bem-vindo ao</Text>
      <Text style={styles.title}>Acessi+</Text>

      <Text style={styles.subtitle}>
        Encontre e avalie lugares acessíveis
      </Text>

      {/* BOTÕES */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonPrimary}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.buttonSecondary}>
        <Text style={styles.buttonSecondaryText}>Criar conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },

  smallText: {
    fontSize: 16,
    color: '#777',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2F5DFF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },

  buttonPrimary: {
    backgroundColor: '#2F5DFF',
    width: '100%',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#2F5DFF',
    width: '100%',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonSecondaryText: {
    color: '#2F5DFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});