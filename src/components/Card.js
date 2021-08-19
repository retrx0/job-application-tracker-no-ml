import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../context/ThemeContext";
import { useCurrentTheme } from "../screens/SettingsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Styles from "../styles/Styles";

const Card = ({ from, date, address, via }) => {
  const { theme } = useContext(ThemeContext);
  var dt = new Date(0);
  dt.setUTCSeconds(date / 1000);
  const _date = dt.toDateString();

  if (String(from).startsWith('"')) from = String(from).replaceAll('"', "");
  if (
    String(from).startsWith("no-reply") ||
    String(from).startsWith("noreply") ||
    String(from).startsWith("jobs")
  )
    from = String(from).split("@")[1].trim();

  if (address) via = String(address).split("@")[1].trim();

  return (
    <View
      style={[
        styles.container,
        Styles.dropShadow,
        Styles.AppBorderRadiusDefault,
        { backgroundColor: theme.backgroundColorCard },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.title, { color: theme.textColorCard }]}>
          {String(from).charAt(0).toUpperCase() + String(from).slice(1)}
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
      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
        }}
      >
        <View
          style={[
            Styles.AppBorderRadiusDefault,
            {
              justifyContent: "flex-start",
              margin: 5,
              backgroundColor: theme.boxBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                fontWeight: "500",
                color: theme.textColorSuccess,
              },
            ]}
          >
            {via ? "via " + via : ""}
          </Text>
        </View>
      </View>

      <Text style={[styles.date, { color: theme.textColorLight }]}>
        {_date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    padding: 10,
    borderRadius: 10,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    padding: 6,
    paddingHorizontal: 15,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
  },
});

export default Card;
