import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    if (email === '') {
      Alert.alert("Acessibilidade", "Campo vazio. Por favor, digite seu e-mail para continuar.");
      return;
    }

    Alert.alert("Sucesso", "Se o e-mail estiver cadastrado, as instruções chegarão em breve em: " + email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Recuperar Senha</Text>
        
        <Text style={styles.subtitulo}>
          Digite o e-mail associado à sua conta para receber um link de redefinição.
        </Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          // Atributos de Acessibilidade
          accessibilityLabel="Campo de entrada de e-mail"
          accessibilityHint="Digite aqui o e-mail que você usou no cadastro"
        />
        
        <TouchableOpacity 
          style={styles.botao} 
          onPress={handleRecuperarSenha}
          accessibilityRole="button"
          accessibilityLabel="Enviar link de recuperação"
        >
          <Text style={styles.botaoTexto}>Enviar Instruções</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#F8F9FB', 
    padding: 20 
  },
  card: { 
    backgroundColor: 'white', 
    padding: 25, 
    borderRadius: 15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
    color: '#333'
  },
  subtitulo: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 25, 
    textAlign: 'center',
    lineHeight: 22
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8,
    marginBottom: 20, 
    padding: 12,
    fontSize: 16
  },
  botao: { 
    backgroundColor: '#2F5DFF', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 10 
  },
  botaoTexto: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  }
});