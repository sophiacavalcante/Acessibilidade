import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

const PRIMARY = '#2F5DFF';
const BACKGROUND = '#F8F9FB';
const TEXT_LIGHT = '#777';

export default function Configuracoes({ navigation }) {

  const [fontSize, setFontSize] = useState(16);
  const [altoContraste, setAltoContraste] = useState(false);
  const [modoDaltonico, setModoDaltonico] = useState(false);
  const [filtroRampa, setFiltroRampa] = useState(false);
  const [filtroBanheiro, setFiltroBanheiro] = useState(false);

  // 🎨 CORES DINÂMICAS
  let bg = BACKGROUND;
  let textColor = '#000';
  let primaryColor = PRIMARY;
  let secondaryBg = '#fff';

  // 🌙 MODO CONTRASTE (escuro, mas mantém azul)
  if (altoContraste) {
    bg = '#1A1A1A'; // cinza escuro
    textColor = '#FFFFFF';
    primaryColor = PRIMARY; // mantém azul
    secondaryBg = '#2A2A2A';
  }

  // MODO DALTÔNICO (preto e branco total)
  if (modoDaltonico) {
    bg = '#FFFFFF';
    textColor = '#000000';
    primaryColor = '#000000';
    secondaryBg = '#F2F2F2';
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>

      {/* TÍTULO */}
      <Text style={[styles.title, { color: primaryColor, fontSize: fontSize + 10 }]}>
        Configurações
      </Text>

      {/* FONTE */}
      <Text style={[styles.sectionTitle, { color: textColor, fontSize }]}>
        Tamanho da fonte
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: primaryColor, marginRight: 5 }]}
          onPress={() => setFontSize(fontSize + 2)}
        >
          <Text style={styles.buttonText}>Aumentar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonSecondary,
            {
              borderColor: primaryColor,
              backgroundColor: secondaryBg,
              marginLeft: 5
            }
          ]}
          onPress={() => setFontSize(fontSize - 2)}
        >
          <Text style={[styles.buttonSecondaryText, { color: primaryColor }]}>
            Diminuir
          </Text>
        </TouchableOpacity>
      </View>

      {/* ACESSIBILIDADE */}
      <Text style={[styles.sectionTitle, { color: textColor, fontSize }]}>
        Acessibilidade
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          Alto contraste
        </Text>
        <Switch value={altoContraste} onValueChange={setAltoContraste} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          Modo daltônico
        </Text>
        <Switch value={modoDaltonico} onValueChange={setModoDaltonico} />
      </View>

      {/* FILTROS */}
      <Text style={[styles.sectionTitle, { color: textColor, fontSize }]}>
        Filtros de locais
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          Apenas com rampa
        </Text>
        <Switch value={filtroRampa} onValueChange={setFiltroRampa} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          Banheiro acessível
        </Text>
        <Switch value={filtroBanheiro} onValueChange={setFiltroBanheiro} />
      </View>

      {/* BOTÃO VOLTAR */}
      <TouchableOpacity
        style={[
          styles.buttonFull,
          {
            borderColor: primaryColor,
            backgroundColor: secondaryBg
          }
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonSecondaryText, { color: primaryColor }]}>
          Voltar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  label: {
    color: TEXT_LIGHT,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
  },

  buttonFull: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonSecondaryText: {
    fontWeight: 'bold',
  },
});