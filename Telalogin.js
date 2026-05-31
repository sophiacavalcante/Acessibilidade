import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { Mail, Lock } from 'lucide-react-native';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const nome = route?.params?.nome || "Usuário";

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const enviarMensagem = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("E-mail inválido", "Digite um e-mail no formato correto. Ex: nome@email.com");
      return;
    }

    setLoading(true);

    try {
      Alert.alert("Sucesso", "Login realizado!");

      setEmail('');
      setPassword('');

      navigation.navigate("Recursos", { nome });

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao entrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10629/10629340.png' }}
          style={styles.image}
        />

        <Text style={styles.welcome}>Bem-vindo ao</Text>
        <Text style={styles.title}>Acessi+</Text>

        <View style={styles.inputContainer}>
          <Mail color="#0056b3" size={20} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color="#0056b3" size={20} />
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
          onPress={enviarMensagem}
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Senha')}>
          <Text style={styles.forgotPassword}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 180,
    height: 146,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F5DFF",
    marginBottom: 10,
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
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
  showText: {
    color: "#2F5DFF",
    fontWeight: "bold",
  },
  primaryButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#2F5DFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 15,
    color: "#2F5DFF",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});