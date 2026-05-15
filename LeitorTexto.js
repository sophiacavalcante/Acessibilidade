import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function App() {
  const [texto, setTexto] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('');
  const [voices, setVoices] = useState([]);
  const [vozSelecionada, setVozSelecionada] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [loadingVoices, setLoadingVoices] = useState(true);

  // 🔊 Carregar vozes reais
  useEffect(() => {
    const carregarVozes = async () => {
      const v = await Speech.getAvailableVoicesAsync();

      const idiomasPermitidos = ['pt', 'en', 'es', 'fr'];

      const validas = v.filter(voice => {
      const lang = voice.language.split('-')[0];

      // Se for português → só deixa Google
      if (lang === 'pt') {
        return (
          !voice.networkConnectionRequired &&
          voice.name.toLowerCase().includes('google')
        );
      }

      // Outros idiomas continuam normais
      return (
        !voice.networkConnectionRequired &&
        idiomasPermitidos.includes(lang)
      );
      });

      setVoices(validas);
      setVozSelecionada(validas[0]);
      setLoadingVoices(false);
    };

    carregarVozes();
  }, []);

  // 🌐 Traduzir automaticamente com base na voz
  const traduzirTexto = async () => {
    if (!texto) return '';

    try {
      const lang = vozSelecionada?.language?.split('-')[0] || 'pt';

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(texto)}`
      );

      const data = await response.json();
      const traduzido = data[0].map(item => item[0]).join('');

      setTextoTraduzido(traduzido);
      return traduzido;
    } catch (error) {
      console.log('Erro na tradução:', error);
      return texto;
    }
  };

  // ▶️ Falar texto
  const falarTexto = async () => {
    if (!texto) return;

    if (tocando) {
      Speech.stop();
      setTocando(false);
      return;
    }

    setTocando(true);

    const textoFinal = await traduzirTexto();

    Speech.speak(textoFinal, {
      voice: vozSelecionada?.identifier,
      onDone: () => setTocando(false),
      onStopped: () => setTocando(false),
    });
  };
  const formatarNomeVoz = (voice) => {
  // remove "Google" ou "Microsoft"
  let nome = voice.name
    .replace(/Google\s?/i, '')
    .replace(/Microsoft\s?/i, '');

  // pega só o primeiro nome (Daniel, Maria, etc)
  const primeiroNome = nome.split(' ')[0];

  // idioma base
  const langCode = voice.language.split('-')[0];

  const idiomas = {
    pt: 'portugues',
    en: 'ingles',
    es: 'espanhol',
    de: 'alemao',
    fr: 'frances'
  };

  const idiomaLocal = idiomas[langCode] || langCode;

  // região (Brazil, US, etc)
  const regiao = voice.language.split('-')[1] || '';

  return `${idiomaLocal} (${primeiroNome}) - ${voice.language.includes('pt') ? 'portuguese' : voice.language.includes('en') ? 'english' : voice.language.includes('es') ? 'spanish' : voice.language} (${regiao})`;
  };
  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="volume-high" size={28} color="#2F5DFF" />
        <Text style={styles.title}>Leitor de Texto</Text>
      </View>

      {/* Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Digite o texto</Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Digite algo..."
          value={texto}
          onChangeText={setTexto}
        />

        {textoTraduzido ? (
          <>
            <Text style={styles.label}>Texto traduzido:</Text>
            <Text style={styles.translated}>{textoTraduzido}</Text>
          </>
        ) : null}
      </View>

      {/* Controles */}
      <View style={styles.card}>
        <Text style={styles.label}>Reprodução</Text>

        <TouchableOpacity style={styles.playBtn} onPress={falarTexto}>
          <Ionicons
            name={tocando ? "pause" : "play"}
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>

        {/* Vozes */}
        <Text style={styles.label}>Vozes disponíveis</Text>

        {loadingVoices ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={{ maxHeight: 200 }}>
            {voices.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.voiceItem,
                  vozSelecionada?.identifier === v.identifier &&
                    styles.voiceActive
                ]}
                onPress={() => setVozSelecionada(v)}
              >
                <Text style={styles.voiceText}>
                  {formatarNomeVoz(v)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  label: {
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },

  translated: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555',
  },

  playBtn: {
    backgroundColor: '#2F5DFF',
    padding: 16,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },

  voiceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },

  voiceActive: {
    backgroundColor: '#DCE4FF',
  },

  voiceText: {
    fontSize: 13,
  },
});