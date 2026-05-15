import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  StyleSheet
} from 'react-native';
import { User, Mail, Lock, ArrowRight } from 'lucide-react-native';

import { db } from './FirebaseConfig';


export default function Telacadastro({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const enviarMensagem = async () => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  setLoading(true);

  try {
    await db.collection('Cadastro').add({
      nome: name,
      email: email.toLowerCase(),
      senha: password,
      data: new Date().toISOString()
    });

    // 🔥 ALERTA COM AÇÃO DE NAVEGAÇÃO
    alert("Sucesso", "Cadastrado com sucesso!");

    setTimeout(() => {
      navigation.navigate("Login", { nome: name });
    }, 100);

    setName('');
    setEmail('');
    setPassword('');

  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Erro ao salvar: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Junte-se a nós e comece sua jornada.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User color="#0056b3" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail color="#0056b3" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock color="#0056b3" size={20} style={styles.icon} />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showText}>
                {showPassword ? "Ocultar" : "Exibir"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.7 }]} 
            activeOpacity={0.8} 
            onPress={enviarMensagem}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Enviando...' : 'Cadastrar'}
            </Text>
            {!loading && <ArrowRight color="#FFF" size={20} />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.footer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.footerText}>
             Já tem uma conta? <Text style={styles.link}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F5DFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: '#D0E3FF',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#777',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2F5DFF',
    flexDirection: 'row',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
    elevation: 4,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#2F5DFF',
    fontWeight: 'bold',
  },
  showText: {
    color: "#2F5DFF",
    fontWeight: "bold",
  },
});