import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../../context/ThemeContext";
import { useCurrentTheme } from "../../screens/SettingsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Styles from "../../styles/Styles";
import ViaBadge from "../badge/ViaBadge";
// import PopUpMenu from "./menu/PopUpMenu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import Arrow from "react-native-bootstrap-icons/icons/arrow-left-right";
import Trash from "react-native-bootstrap-icons/icons/trash";
import PencilSquare from "react-native-bootstrap-icons/icons/pencil-square";
import CustomMenuOption from "./../card/menu/CustomMenuOption";

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
        <PopUpMenu theme={theme} />
      </View>
      <ViaBadge theme={theme} via={via} />
      <Text style={[styles.date, { color: theme.textColorLight }]}>
        {_date}
      </Text>
    </View>
  );
};

const PopUpMenu = ({ theme }) => {
  const customMenuStyle = {
    optionText: {
      fontSize: 18,
      color: theme.textColorCard,
    },
    optionsContainer: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.backgroundColor,
    },
  };

  return (
    <Menu>
      <MenuTrigger>
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
      </MenuTrigger>
      <MenuOptions customStyles={customMenuStyle}>
        <CustomMenuOption
          text={"Recategorize"}
          IconComponent={Arrow}
          textColor={theme.textColorCard}
        />
        <CustomMenuOption
          text={"Edit"}
          IconComponent={PencilSquare}
          textColor={theme.textColorCard}
        />
        <CustomMenuOption
          text={"Delete"}
          IconComponent={Trash}
          textColor={theme.textColorDanger}
        />
      </MenuOptions>
    </Menu>
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
