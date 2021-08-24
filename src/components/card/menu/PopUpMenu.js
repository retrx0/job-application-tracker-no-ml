import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import Arrow from "react-native-bootstrap-icons/icons/arrow-left-right";
import Trash from "react-native-bootstrap-icons/icons/trash";
import PencilSquare from "react-native-bootstrap-icons/icons/pencil-square";
import CustomMenuOption from "./CustomMenuOption";
import Styles from "../../../styles/Styles";

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
            borderRadius: Styles.AppBorderRadiusDefault,
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

export default PopUpMenu;
