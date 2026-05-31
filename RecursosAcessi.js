import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import {
  Eye,
  Ear,
  MapPin,
  Headphones,
  Menu,
  ChevronRight,
} from "lucide-react-native";

import { useConfig } from "./Config";

export default function Recursos({
  navigation,
  route,
}) {
  const [menuAberto, setMenuAberto] =
    React.useState(false);

  const nomeUsuario =
    route?.params?.nome || "Usuário";

  // CONFIGURAÇÕES GLOBAIS

  const {
    fontSize,
    altoContraste,
    modoDaltonico,
  } = useConfig();

  // CORES PADRÃO

  let bg = "#F8FAFC";

  let textColor = "#111827";

  let secondaryText = "#6B7280";

  let primary = "#2F5DFF";

  let cardBg = "#FFFFFF";

  let menuBg = "#FFFFFF";

  let heroBg = "#2F5DFF";

  // ALTO CONTRASTE

  // ALTO CONTRASTE (PRETO E AZUL)

  if (altoContraste) {
    bg = '#000000';

    textColor = '#FFFFFF';

    secondaryText = '#DDDDDD';

    primary = '#0A84FF';

    cardBg = '#111111';

    menuBg = '#111111';

    heroBg = '#0A84FF';
  }

  // MODO DALTÔNICO (PRETO E BRANCO)

  if (modoDaltonico) {
    bg = "#FFFFFF";

    textColor = "#000000";

    secondaryText = "#333333";

    primary = "#000000";

    cardBg = "#F2F2F2";

    menuBg = "#F2F2F2";

    heroBg = "#000000";
  }

  const recursos = [
    {
      titulo: "Leitor de Texto",
      descricao: "Converta texto em áudio",
      icon: (
        <Eye
          size={26}
          color={primary}
        />
      ),
      tela: "LeitorTexto",
      bg: modoDaltonico
        ? "#E5E5E5"
        : "#EEF2FF",
    },

    {
      titulo:
        "Reconhecimento de Voz",

      descricao: "Controle por voz",

      icon: (
        <Ear
          size={26}
          color={primary}
        />
      ),

      tela: "ReconhecimentoVoz",

      bg: modoDaltonico
        ? "#E5E5E5"
        : "#EFF6FF",
    },

    {
      titulo: "Locais",

      descricao:
        "Locais acessíveis",

      icon: (
        <MapPin
          size={26}
          color={primary}
        />
      ),

      tela: "Locais",

      bg: modoDaltonico
        ? "#E5E5E5"
        : "#FFFBEB",
    },

    {
      titulo: "Suporte",

      descricao:
        "Atendimento acessível",

      icon: (
        <Headphones
          size={26}
          color={primary}
        />
      ),

      tela: "Suporte",

      bg: modoDaltonico
        ? "#E5E5E5"
        : "#F5F3FF",
    },
  ];

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: bg,
        },
      ]}
    >
      <StatusBar
        barStyle={
          altoContraste
            ? "light-content"
            : "dark-content"
        }
        backgroundColor={bg}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.profileLeft}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor:
                    primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.avatarText,
                  {
                    fontSize:
                      fontSize + 6,
                  },
                ]}
              >
                {nomeUsuario
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.welcome,
                  {
                    color:
                      secondaryText,

                    fontSize:
                      fontSize - 3,
                  },
                ]}
              >
                Bem-vindo 👋
              </Text>

              <Text
                style={[
                  styles.nome,
                  {
                    color: textColor,

                    fontSize:
                      fontSize + 4,
                  },
                ]}
              >
                {nomeUsuario}
              </Text>
            </View>
          </View>

          {/* BOTÃO MENU */}

          <TouchableOpacity
            style={[
              styles.menuButton,
              {
                backgroundColor:
                  cardBg,
              },
            ]}
            onPress={() =>
              setMenuAberto(true)
            }
            activeOpacity={0.8}
          >
            <Menu
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        {/* HERO */}

        <View
          style={[
            styles.hero,
            {
              backgroundColor:
                heroBg,
            },
          ]}
        >
          <Text
            style={[
              styles.heroTitle,
              {
                fontSize:
                  fontSize + 8,
              },
            ]}
          >
            Recursos de
            Acessibilidade
          </Text>

          <Text
            style={[
              styles.heroText,
              {
                fontSize:
                  fontSize - 1,
              },
            ]}
          >
            Ferramentas
            desenvolvidas para
            melhorar sua experiência
            no aplicativo.
          </Text>
        </View>

        {/* CARDS */}

        <View style={styles.grid}>
          {recursos.map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      cardBg,
                  },
                ]}
                activeOpacity={0.88}
                onPress={() =>
                  navigation.navigate(
                    item.tela
                  )
                }
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        item.bg,
                    },
                  ]}
                >
                  {item.icon}
                </View>

                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color: textColor,

                      fontSize:
                        fontSize + 1,
                    },
                  ]}
                >
                  {item.titulo}
                </Text>

                <Text
                  style={[
                    styles.cardText,
                    {
                      color:
                        secondaryText,

                      fontSize:
                        fontSize - 2,
                    },
                  ]}
                >
                  {item.descricao}
                </Text>

                <View
                  style={
                    styles.cardFooter
                  }
                >
                  <Text
                    style={[
                      styles.cardAction,
                      {
                        color: primary,

                        fontSize:
                          fontSize - 2,
                      },
                    ]}
                  >
                    Abrir
                  </Text>

                  <ChevronRight
                    size={18}
                    color={primary}
                  />
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>

      {/* MENU LATERAL */}

      {menuAberto && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={
              styles.overlayBackground
            }
            onPress={() =>
              setMenuAberto(false)
            }
          />

          <View
            style={[
              styles.menu,
              {
                backgroundColor:
                  menuBg,
              },
            ]}
          >
            <Text
              style={[
                styles.menuTitle,
                {
                  color: textColor,

                  fontSize:
                    fontSize + 8,
                },
              ]}
            >
              Menu
            </Text>

            <TouchableOpacity
              style={
                styles.menuItemBox
              }
              onPress={() =>
                navigation.navigate(
                  "Config"
                )
              }
            >
              <Text
                style={[
                  styles.menuItem,
                  {
                    color: textColor,

                    fontSize:
                      fontSize,
                  },
                ]}
              >
                ⚙️ Configurações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.menuItemBox
              }
              onPress={() =>
                setMenuAberto(false)
              }
            >
              <Text
                style={[
                  styles.menuItem,
                  {
                    color: textColor,

                    fontSize:
                      fontSize,
                  },
                ]}
              >
                ❌ Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  // HEADER

  header: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 28,
  },

  profileLeft: {
    flexDirection: "row",

    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 29,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 14,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,

    elevation: 5,
  },

  avatarText: {
    color: "#FFF",

    fontWeight: "700",
  },

  welcome: {
    marginBottom: 2,
  },

  nome: {
    fontWeight: "700",
  },

  menuButton: {
    width: 48,
    height: 48,

    borderRadius: 14,

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 8,

    elevation: 4,
  },

  // HERO

  hero: {
    borderRadius: 28,

    padding: 24,

    marginBottom: 28,
  },

  heroTitle: {
    fontWeight: "700",

    color: "#FFF",

    marginBottom: 10,
  },

  heroText: {
    lineHeight: 22,

    color:
      "rgba(255,255,255,0.88)",
  },

  // GRID

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent:
      "space-between",
  },

  card: {
    width: "47%",

    borderRadius: 24,

    padding: 18,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 4,
  },

  iconContainer: {
    width: 56,
    height: 56,

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  cardTitle: {
    fontWeight: "700",

    marginBottom: 8,

    lineHeight: 22,
  },

  cardText: {
    lineHeight: 20,

    minHeight: 40,
  },

  cardFooter: {
    marginTop: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  cardAction: {
    fontWeight: "600",
  },

  // MENU

  overlay: {
    position: "absolute",

    width: "100%",

    height: "100%",

    flexDirection: "row",
  },

  overlayBackground: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.35)",
  },

  menu: {
    width: 250,

    paddingTop: 60,

    paddingHorizontal: 20,

    shadowColor: "#000",

    shadowOffset: {
      width: -2,
      height: 0,
    },

    shadowOpacity: 0.1,

    shadowRadius: 12,

    elevation: 10,
  },

  menuTitle: {
    fontWeight: "700",

    marginBottom: 25,
  },

  menuItemBox: {
    backgroundColor: "#F3F4F6",

    paddingVertical: 14,

    paddingHorizontal: 14,

    borderRadius: 14,

    marginBottom: 14,
  },

  menuItem: {
    fontWeight: "500",
  },
});