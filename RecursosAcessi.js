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

export default function Recursos({ navigation, route }) {
  const [menuAberto, setMenuAberto] = React.useState(false);

  const nomeUsuario = route?.params?.nome || "Usuário";

  const recursos = [
    {
      titulo: "Leitor de Texto",
      descricao: "Converta texto em áudio",
      icon: <Eye size={26} color="#4F46E5" />,
      tela: "LeitorTexto",
      bg: "#EEF2FF",
    },
    {
      titulo: "Reconhecimento de Voz",
      descricao: "Controle por voz",
      icon: <Ear size={26} color="#2563EB" />,
      tela: "ReconhecimentoVoz",
      bg: "#EFF6FF",
    },
    {
      titulo: "Locais",
      descricao: "Locais acessíveis",
      icon: <MapPin size={26} color="#F59E0B" />,
      tela: "Locais",
      bg: "#FFFBEB",
    },
    {
      titulo: "Suporte",
      descricao: "Atendimento acessível",
      icon: <Headphones size={26} color="#7C3AED" />,
      tela: "Suporte",
      bg: "#F5F3FF",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.profileLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {nomeUsuario.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View>
              <Text style={styles.welcome}>Bem-vindo 👋</Text>
              <Text style={styles.nome}>{nomeUsuario}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuAberto(true)}
            activeOpacity={0.8}
          >
            <Menu size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* HERO CARD */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Recursos de Acessibilidade
          </Text>

          <Text style={styles.heroText}>
            Ferramentas desenvolvidas para melhorar sua experiência no app.
          </Text>
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {recursos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.88}
              onPress={() => navigation.navigate(item.tela)}
            >
              {/* ÍCONE */}
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.bg },
                ]}
              >
                {item.icon}
              </View>

              {/* TEXTO */}
              <Text style={styles.cardTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.cardText}>
                {item.descricao}
              </Text>

              {/* FOOTER */}
              <View style={styles.cardFooter}>
                <Text style={styles.cardAction}>
                  Abrir
                </Text>

                <ChevronRight size={18} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MENU LATERAL */}
      {menuAberto && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayBackground}
            onPress={() => setMenuAberto(false)}
          />

          <View style={styles.menu}>
            <Text style={styles.menuTitle}>
              Menu
            </Text>

            <TouchableOpacity
              style={styles.menuItemBox}
              onPress={() => navigation.navigate("Config")}
            >
              <Text style={styles.menuItem}>
                ⚙️ Configurações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemBox}
              onPress={() => setMenuAberto(false)}
            >
              <Text style={styles.menuItem}>
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
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#2F5DFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,

    shadowColor: "#2F5DFF",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 5,
  },

  avatarText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },

  welcome: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },

  nome: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  /* HERO */

  hero: {
    backgroundColor: "#2F5DFF",
    borderRadius: 28,
    padding: 24,
    marginBottom: 28,
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 10,
  },

  heroText: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255,255,255,0.85)",
  },

  /* GRID */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,

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
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    lineHeight: 22,
  },

  cardText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
    minHeight: 40,
  },

  cardFooter: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardAction: {
    color: "#2F5DFF",
    fontWeight: "600",
    fontSize: 13,
  },

  /* MENU */

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },

  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  menu: {
    width: 250,
    backgroundColor: "#FFF",
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
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
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
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
});