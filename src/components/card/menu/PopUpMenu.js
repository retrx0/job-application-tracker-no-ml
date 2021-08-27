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
import { deleteJob, recategorizeJob } from "../../../controller/JobController";

const PopUpMenu = ({ theme }) => {
  const customMenuStyle = {
    optionText: {
      fontSize: 18,
      color: theme.textColorCard,
    },
    optionsContainer: [
      Styles.AppBorderRadiusDefault,
      {
        padding: 10,
        backgroundColor: theme.backgroundColor,
      },
    ],
  };

  return (
    <Menu>
      <MenuTrigger>
        <TouchableOpacity
          style={[
            Styles.AppBorderRadiusSmall,
            {
              backgroundColor: theme.boxBackground,
              margin: 5,
              width: 35,
              height: 32,
              alignSelf: "flex-end",
            },
          ]}
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
          onClick={() => {
            recategorizeJob(jobItem, "Interview", callBack);
          }}
        />
        <CustomMenuOption
          text={"Edit"}
          IconComponent={PencilSquare}
          textColor={theme.textColorCard}
          onClick={() => {
            setEditModalVisible(true);
          }}
        />
        <CustomMenuOption
          text={"Delete"}
          IconComponent={Trash}
          textColor={theme.textColorDanger}
          onClick={() => {
            deleteJob(jobItem, callBack);
          }}
        />
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;
