import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../context/ThemeContext";
import { useCurrentTheme } from "../screens/SettingsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Styles from "../styles/Styles";

const Card = ({ title, subject, email }) => {
  const { theme } = useContext(ThemeContext);
  var dt = new Date(0);
  dt.setUTCSeconds(dt / 1000);
  const _date = dt.toDateString();
  return (
    <View
      style={[
        styles.container,
        Styles.dropShadow,
        { backgroundColor: theme.backgroundColorCard },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.title, { color: theme.textColorCard }]}>
          {title}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 8,
            backgroundColor: theme.boxBackground,
            margin: 5,
            width: 35,
            height: 32,
            alignSelf: "flex-end",
          }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            style={{
              color: theme.boxText,
              fontSize: 30,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          />
        </TouchableOpacity>
      </View>
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
});

export default Card;
