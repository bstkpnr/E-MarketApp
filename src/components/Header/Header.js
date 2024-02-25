import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title, navigation }) => {
  const iOS = Platform.OS === "ios";

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: iOS ? 48 : 0, alignItems: "center" },
      ]}
    >
      {navigation && navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 80,
    gap: 12,
    height: "auto",
    padding: 10,
    backgroundColor: "#2A59FE",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default Header;
