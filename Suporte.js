import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
  Modal,
  TextInput,
} from 'react-native';

import {
  MessageCircle,
  Mail,
  Headphones,
} from 'lucide-react-native';

import { useConfig } from './Config';

export default function SuporteInclusivo() {
  const [modalVisible, setModalVisible] =
    useState(false);

  const [emailCliente, setEmailCliente] =
    useState('');

  // CONFIGURAÇÕES GLOBAIS

  const {
    fontSize,
    altoContraste,
    modoDaltonico,
  } = useConfig();

  // CORES PADRÃO

  let bg = '#F5F9FF';

  let cardBg = '#FFFFFF';

  let textColor = '#1E3A5F';

  let secondaryText = '#666';

  let primary = '#0A84FF';

  let borderColor = '#E3ECFF';

  let iconBg = '#EAF4FF';

  let modalBg = '#FFFFFF';

  let inputBg = '#FFFFFF';

  // ALTO CONTRASTE

  if (altoContraste) {
    bg = '#000000';

    cardBg = '#111111';

    textColor = '#FFFFFF';

    secondaryText = '#DDDDDD';

    primary = '#0A84FF';

    borderColor = '#0A84FF';

    iconBg = '#1A1A1A';

    modalBg = '#111111';

    inputBg = '#1A1A1A';
  }

  // MODO DALTÔNICO

  if (modoDaltonico) {
    bg = '#FFFFFF';

    cardBg = '#F2F2F2';

    textColor = '#000000';

    secondaryText = '#333333';

    primary = '#000000';

    borderColor = '#CCCCCC';

    iconBg = '#E5E5E5';

    modalBg = '#F2F2F2';

    inputBg = '#FFFFFF';
  }

  // WHATSAPP

  const abrirWhatsApp = async () => {
    const telefone = '5585986861080';

    const mensagem =
      'Olá! Preciso de suporte no aplicativo.';

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
      mensagem
    )}`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'Erro',
        'Não foi possível abrir o WhatsApp.'
      );
    }
  };

  // EMAIL

  const enviarEmail = async () => {
    if (!emailCliente.trim()) {
      Alert.alert(
        'E-mail obrigatório',
        'Digite seu e-mail.'
      );
      return;
    }

    const destinatario =
      'vinnerro252@gmail.com';

    const assunto =
      'Suporte do Aplicativo';

    const mensagem = `
Olá, preciso de ajuda com o aplicativo.

E-mail do cliente: ${emailCliente}
`;

    const url = `mailto:${destinatario}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(
      mensagem
    )}`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);

      setModalVisible(false);

      setEmailCliente('');
    } else {
      Alert.alert(
        'Erro',
        'Nenhum aplicativo de e-mail encontrado.'
      );
    }
  };

  const renderOpcao = (
    titulo,
    descricao,
    Icon,
    onPress
  ) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
            borderColor: borderColor,
          },
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityHint={descricao}
      >
        <View
          style={[
            styles.iconeContainer,
            {
              backgroundColor: iconBg,
            },
          ]}
        >
          <Icon
            size={32}
            color={primary}
          />
        </View>

        <View style={styles.textoContainer}>
          <Text
            style={[
              styles.cardTitulo,
              {
                color: textColor,
                fontSize:
                  fontSize + 4,
              },
            ]}
          >
            {titulo}
          </Text>

          <Text
            style={[
              styles.cardDescricao,
              {
                color: secondaryText,
                fontSize:
                  fontSize - 1,
              },
            ]}
          >
            {descricao}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: bg,
        },
      ]}
    >
      <View style={styles.header}>
        <Headphones
          size={42}
          color={primary}
        />

        <Text
          style={[
            styles.titulo,
            {
              color: primary,
              fontSize:
                fontSize + 14,
            },
          ]}
        >
          Suporte
        </Text>

        <Text
          style={[
            styles.subtitulo,
            {
              color: secondaryText,
              fontSize:
                fontSize,
            },
          ]}
        >
          Escolha a forma de
          atendimento.
        </Text>
      </View>

      <View style={styles.opcoesContainer}>
        {renderOpcao(
          'WhatsApp',
          'Converse conosco pelo WhatsApp.',
          MessageCircle,
          abrirWhatsApp
        )}

        {renderOpcao(
          'E-mail',
          'Envie uma mensagem por e-mail.',
          Mail,
          () => setModalVisible(true)
        )}
      </View>

      {/* MODAL EMAIL */}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor:
                  modalBg,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitulo,
                {
                  color: primary,
                  fontSize:
                    fontSize + 6,
                },
              ]}
            >
              Digite seu e-mail
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
              placeholder="Digite seu e-mail"
              placeholderTextColor={
                secondaryText
              }
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailCliente}
              onChangeText={setEmailCliente}
            />

            <TouchableOpacity
              style={[
                styles.modalBotao,
                {
                  backgroundColor:
                    primary,
                },
              ]}
              onPress={enviarEmail}
            >
              <Text
                style={[
                  styles.modalBotaoTexto,
                  {
                    fontSize:
                      fontSize,
                  },
                ]}
              >
                Enviar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={[
                  styles.cancelar,
                  {
                    color:
                      secondaryText,

                    fontSize:
                      fontSize,
                  },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },

  titulo: {
    fontWeight: 'bold',
    marginTop: 12,
  },

  subtitulo: {
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
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  iconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  textoContainer: {
    flex: 1,
  },

  cardTitulo: {
    fontWeight: 'bold',
    marginBottom: 6,
  },

  cardDescricao: {
    lineHeight: 20,
  },

  // MODAL

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '85%',
    borderRadius: 20,
    padding: 25,
  },

  modalTitulo: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 20,
  },

  modalBotao: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  modalBotaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  cancelar: {
    textAlign: 'center',
    marginTop: 15,
  },
});