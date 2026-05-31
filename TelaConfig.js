import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';

import { useConfig } from './Config';

export default function TelaConfig({
  navigation,
}) {
  const {
    fontSize,
    setFontSize,

    altoContraste,
    setAltoContraste,

    modoDaltonico,
    setModoDaltonico,
  } = useConfig();

  // FILTROS DE LOCAIS

  const [somenteRampa, setSomenteRampa] =
    useState(false);

  const [
    banheiroAcessivel,
    setBanheiroAcessivel,
  ] = useState(false);

  // CORES

  let bg = '#F8FAFC';

  let cardBg = '#FFFFFF';

  let textColor = '#111827';

  let secondaryText = '#6B7280';

  let primary = '#2F5DFF';

  // ALTO CONTRASTE (PRETO E AZUL)

  if (altoContraste) {
    bg = '#000000';

    cardBg = '#111111';

    textColor = '#FFFFFF';

    secondaryText = '#DDDDDD';

    primary = '#0A84FF';
  }

  // DALTÔNICO (PRETO E BRANCO)

  if (modoDaltonico) {
    bg = '#FFFFFF';

    cardBg = '#F2F2F2';

    textColor = '#000000';

    secondaryText = '#333333';

    primary = '#000000';
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
        },
      ]}
    >
      {/* TÍTULO */}

      <Text
        style={[
          styles.title,
          {
            color: primary,
            fontSize: fontSize + 12,
          },
        ]}
      >
        Configurações
      </Text>

      {/* TAMANHO DA FONTE */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: textColor,
              fontSize: fontSize + 2,
            },
          ]}
        >
          Tamanho da Fonte
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: secondaryText,
              fontSize,
            },
          ]}
        >
          Ajuste o tamanho dos textos
          do aplicativo.
        </Text>

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  primary,
              },
            ]}
            onPress={() =>
              setFontSize(fontSize + 2)
            }
          >
            <Text
              style={styles.buttonText}
            >
              Aumentar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  primary,
              },
            ]}
            onPress={() =>
              setFontSize(
                Math.max(
                  12,
                  fontSize - 2
                )
              )
            }
          >
            <Text
              style={styles.buttonText}
            >
              Diminuir
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ACESSIBILIDADE */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: textColor,
              fontSize: fontSize + 2,
            },
          ]}
        >
          Acessibilidade
        </Text>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {
                color: textColor,
                fontSize,
              },
            ]}
          >
            Alto Contraste
          </Text>

          <Switch
            value={altoContraste}
            onValueChange={
              setAltoContraste
            }
          />
        </View>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {
                color: textColor,
                fontSize,
              },
            ]}
          >
            Modo Daltônico
          </Text>

          <Switch
            value={modoDaltonico}
            onValueChange={
              setModoDaltonico
            }
          />
        </View>
      </View>

      {/* FILTROS DE LOCAIS */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: textColor,
              fontSize: fontSize + 2,
            },
          ]}
        >
          Filtros de Locais
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: secondaryText,
              fontSize,
            },
          ]}
        >
          Escolha quais locais
          acessíveis devem aparecer.
        </Text>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {
                color: textColor,
                fontSize,
              },
            ]}
          >
            Apenas com rampa
          </Text>

          <Switch
            value={somenteRampa}
            onValueChange={
              setSomenteRampa
            }
          />
        </View>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {
                color: textColor,
                fontSize,
              },
            ]}
          >
            Banheiro acessível
          </Text>

          <Switch
            value={banheiroAcessivel}
            onValueChange={
              setBanheiroAcessivel
            }
          />
        </View>
      </View>

      {/* BOTÃO VOLTAR */}

      <TouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: primary,
          },
        ]}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Text
          style={styles.buttonText}
        >
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },

  card: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 3,
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    marginBottom: 20,
    lineHeight: 22,
  },

  rowButtons: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  option: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    alignItems: 'center',

    marginTop: 18,
  },

  optionText: {
    fontWeight: '500',
  },

  backButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});