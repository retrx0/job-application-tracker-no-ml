import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import ThemeContext from "../context/ThemeContext";
import { useCurrentTheme } from "../screens/SettingsScreen";

const Card = ({ title, email, subject }) => {
  const { theme } = useContext(ThemeContext);
  // const theme = useCurrentTheme();
  return (
    <View
      style={[
        styles.container,
        styles.dropShadow,
        { backgroundColor: theme.backgroundColorCard },
      ]}
    >
      <Text style={[styles.title, { color: theme.textColorCard }]}>
        {title}
      </Text>
      <Text style={[styles.text, { color: theme.textColorCardBody }]}>
        {subject}
      </Text>
      <Text style={[styles.email, { color: theme.textColorLight }]}>
        {email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    padding: 10,
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 15,
  },
  email: {
    alignSelf: "flex-end",
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default Card;
