import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  MessageCircle,
  Mic,
  Headphones,
} from 'lucide-react-native';

export default function SuporteInclusivo() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  const iniciarAtendimento = () => {
    if (!opcaoSelecionada) {
      Alert.alert(
        'Selecione uma opção',
        'Escolha uma forma de atendimento para continuar.'
      );
      return;
    }

    Alert.alert(
      'Atendimento iniciado',
      `Você selecionou: ${opcaoSelecionada}`
    );
  };

  const renderOpcao = (titulo, descricao, Icon, valor) => {
    const selecionado = opcaoSelecionada === valor;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          selecionado && styles.cardSelecionado,
        ]}
        // Se clicar novamente na opção já selecionada, ela é desmarcada
        onPress={() =>
          setOpcaoSelecionada(
            opcaoSelecionada === valor ? null : valor
          )
        }
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityHint={descricao}
      >
        <View
          style={[
            styles.iconeContainer,
            selecionado && styles.iconeSelecionado,
          ]}
        >
          <Icon
            size={32}
            color={selecionado ? '#FFFFFF' : '#0A84FF'}
          />
        </View>

        <View style={styles.textoContainer}>
          <Text
            style={[
              styles.cardTitulo,
              selecionado && styles.cardTituloSelecionado,
            ]}
          >
            {titulo}
          </Text>
          <Text style={styles.cardDescricao}>
            {descricao}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Headphones size={42} color="#2F5DFF" />
        <Text style={styles.titulo}>Suporte Inclusivo</Text>
        <Text style={styles.subtitulo}>
          Escolha a forma de atendimento mais acessível para você.
        </Text>
      </View>

      <View style={styles.opcoesContainer}>
        {renderOpcao(
          'Chat por Texto',
          'Converse com nossa equipe por mensagens escritas.',
          MessageCircle,
          'Chat por Texto'
        )}

        {renderOpcao(
          'Atendimento por Voz',
          'Fale com nossa equipe utilizando reconhecimento de voz.',
          Mic,
          'Atendimento por Voz'
        )}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={iniciarAtendimento}
        accessibilityRole="button"
        accessibilityLabel="Iniciar Atendimento"
      >
        <Text style={styles.botaoTexto}>
          Iniciar Atendimento
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2F5DFF',
    marginTop: 12,
  },

  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  opcoesContainer: {
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2F5DFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardSelecionado: {
    borderColor: '#0A84FF',
    backgroundColor: '#EAF4FF',
  },

  iconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  iconeSelecionado: {
    backgroundColor: '#2F5DFF',
  },

  textoContainer: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F5DFF',
    marginBottom: 6,
  },

  cardTituloSelecionado: {
    color: '#2F5DFF',
  },

  cardDescricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  botao: {
    backgroundColor: '#2F5DFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#0A84FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});