import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import * as Speech from 'expo-speech';

import { useConfig } from './Config';

export default function App() {
  const [texto, setTexto] = useState('');

  const [textoTraduzido, setTextoTraduzido] =
    useState('');

  const [voices, setVoices] =
    useState([]);

  const [
    vozSelecionada,
    setVozSelecionada,
  ] = useState(null);

  const [tocando, setTocando] =
    useState(false);

  const [
    loadingVoices,
    setLoadingVoices,
  ] = useState(true);

  // CONFIGURAÇÕES GLOBAIS

  const {
    fontSize,
    altoContraste,
    modoDaltonico,
  } = useConfig();

  // CORES PADRÃO

  let bg = '#F4F4F4';

  let cardBg = '#FFFFFF';

  let textColor = '#111827';

  let secondaryText = '#555';

  let primary = '#2F5DFF';

  let borderColor = '#DDD';

  let inputBg = '#FFFFFF';

  let activeVoice = '#DCE4FF';

  // ALTO CONTRASTE

  if (altoContraste) {
    bg = '#000000';

    cardBg = '#111111';

    textColor = '#FFFFFF';

    secondaryText = '#DDDDDD';

    primary = '#0A84FF';

    borderColor = '#444444';

    inputBg = '#1A1A1A';

    activeVoice = '#0A84FF';
  }

  // MODO DALTÔNICO

  if (modoDaltonico) {
    bg = '#FFFFFF';

    cardBg = '#F2F2F2';

    textColor = '#000000';

    secondaryText = '#333333';

    primary = '#000000';

    borderColor = '#CCCCCC';

    inputBg = '#FFFFFF';

    activeVoice = '#D9D9D9';
  }

  // 🔊 CARREGAR VOZES

  useEffect(() => {
    const carregarVozes = async () => {
      const v =
        await Speech.getAvailableVoicesAsync();

      const idiomasPermitidos = [
        'pt',
        'en',
        'es',
        'fr',
      ];

      const validas = v.filter(
        voice => {
          const lang =
            voice.language.split(
              '-'
            )[0];

          // PORTUGUÊS → APENAS GOOGLE

          if (lang === 'pt') {
            return (
              !voice.networkConnectionRequired &&
              voice.name
                .toLowerCase()
                .includes('google')
            );
          }

          return (
            !voice.networkConnectionRequired &&
            idiomasPermitidos.includes(
              lang
            )
          );
        }
      );

      setVoices(validas);

      setVozSelecionada(validas[0]);

      setLoadingVoices(false);
    };

    carregarVozes();
  }, []);

  // 🌐 TRADUÇÃO

  const traduzirTexto = async () => {
    if (!texto) return '';

    try {
      const lang =
        vozSelecionada?.language?.split(
          '-'
        )[0] || 'pt';

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
          texto
        )}`
      );

      const data =
        await response.json();

      const traduzido = data[0]
        .map(item => item[0])
        .join('');

      setTextoTraduzido(
        traduzido
      );

      return traduzido;
    } catch (error) {
      console.log(
        'Erro na tradução:',
        error
      );

      return texto;
    }
  };

  // ▶️ FALAR TEXTO

  const falarTexto = async () => {
    if (!texto) return;

    if (tocando) {
      Speech.stop();

      setTocando(false);

      return;
    }

    setTocando(true);

    const textoFinal =
      await traduzirTexto();

    Speech.speak(textoFinal, {
      voice:
        vozSelecionada?.identifier,

      onDone: () =>
        setTocando(false),

      onStopped: () =>
        setTocando(false),
    });
  };

  // FORMATAR NOME DAS VOZES

  const formatarNomeVoz = voice => {
    let nome = voice.name
      .replace(/Google\s?/i, '')
      .replace(/Microsoft\s?/i, '');

    const primeiroNome =
      nome.split(' ')[0];

    const langCode =
      voice.language.split('-')[0];

    const idiomas = {
      pt: 'português',
      en: 'inglês',
      es: 'espanhol',
      de: 'alemão',
      fr: 'francês',
    };

    const idiomaLocal =
      idiomas[langCode] ||
      langCode;

    const regiao =
      voice.language.split('-')[1] ||
      '';

    return `${idiomaLocal} (${primeiroNome}) - ${regiao}`;
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: bg,
        },
      ]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Ionicons
          name="volume-high"
          size={28}
          color={primary}
        />

        <Text
          style={[
            styles.title,
            {
              color: textColor,
              fontSize:
                fontSize + 8,
            },
          ]}
        >
          Leitor de Texto
        </Text>
      </View>

      {/* INPUT */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              cardBg,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            {
              color: textColor,
              fontSize:
                fontSize,
            },
          ]}
        >
          Digite o texto
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                borderColor,

              backgroundColor:
                inputBg,

              color: textColor,

              fontSize:
                fontSize,
            },
          ]}
          multiline
          placeholder="Digite algo..."
          placeholderTextColor={
            secondaryText
          }
          value={texto}
          onChangeText={setTexto}
        />

        {textoTraduzido ? (
          <>
            <Text
              style={[
                styles.label,
                {
                  color:
                    textColor,

                  fontSize:
                    fontSize,
                },
              ]}
            >
              Texto traduzido:
            </Text>

            <Text
              style={[
                styles.translated,
                {
                  color:
                    secondaryText,

                  fontSize:
                    fontSize - 1,
                },
              ]}
            >
              {textoTraduzido}
            </Text>
          </>
        ) : null}
      </View>

      {/* CONTROLES */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              cardBg,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            {
              color: textColor,
              fontSize:
                fontSize,
            },
          ]}
        >
          Reprodução
        </Text>

        <TouchableOpacity
          style={[
            styles.playBtn,
            {
              backgroundColor:
                primary,
            },
          ]}
          onPress={falarTexto}
        >
          <Ionicons
            name={
              tocando
                ? 'pause'
                : 'play'
            }
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>

        {/* VOZES */}

        <Text
          style={[
            styles.label,
            {
              color: textColor,
              fontSize:
                fontSize,
            },
          ]}
        >
          Vozes disponíveis
        </Text>

        {loadingVoices ? (
          <ActivityIndicator
            color={primary}
          />
        ) : (
          <ScrollView
            style={{
              maxHeight: 200,
            }}
          >
            {voices.map(
              (v, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.voiceItem,
                    {
                      borderColor:
                        borderColor,
                    },

                    vozSelecionada?.identifier ===
                      v.identifier && {
                      backgroundColor:
                        activeVoice,
                    },
                  ]}
                  onPress={() =>
                    setVozSelecionada(
                      v
                    )
                  }
                >
                  <Text
                    style={[
                      styles.voiceText,
                      {
                        color:
                          textColor,

                        fontSize:
                          fontSize - 2,
                      },
                    ]}
                  >
                    {formatarNomeVoz(
                      v
                    )}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 10,
  },

  title: {
    fontWeight: 'bold',
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  label: {
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },

  translated: {
    marginTop: 8,
    fontStyle: 'italic',
  },

  playBtn: {
    padding: 16,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },

  voiceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 8,
  },

  voiceText: {},

  voiceActive: {},
});