import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../../context/ThemeContext";
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
import CardModal from "../modal/CardModal";
import { getDateInString } from "../../util/TimeUtil";
import RecategorizeModal from "../modal/RecategorizeModal";
import JobCardContext from "../../context/JobCardContext";
import {
  capitalizeFirstLetter,
  trimAndRemoveUnnecessaryCharFromEmailSender,
} from "../../util/StringUtil";

const Card = ({ modalRef, jobItem, setAutoFill, setEditModalVisible }) => {
  const { theme } = useContext(ThemeContext);
  const _date = getDateInString(jobItem.date);
  const { deleteJob } = useContext(JobCardContext);
  // const [editModalVisible, setEditModalVisible] = useState(false);
  const [recategorizeModalVisible, setRecategorizeModalVisible] =
    useState(false);

  trimAndRemoveUnnecessaryCharFromEmailSender(jobItem);

  const showDeleteAlert = (jobItem) => {
    Alert.alert("Warning", "Are you sure you want to delete this item", [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled deletion"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteJob(jobItem),
        style: "destructive",
      },
    ]);
  };

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
              setRecategorizeModalVisible((v) => !v);
            }}
          />
          <CustomMenuOption
            text={"Edit"}
            IconComponent={PencilSquare}
            textColor={theme.textColorCard}
            onClick={() => {
              setAutoFill(jobItem);
              modalRef.current?.open();
              // setEditModalVisible(true);
            }}
          />
          <CustomMenuOption
            text={"Delete"}
            IconComponent={Trash}
            textColor={theme.textColorDanger}
            onClick={() => {
              showDeleteAlert(jobItem);
            }}
          />
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <View
      style={[
        styles.container,
        Styles.dropShadow,
        Styles.AppBorderRadiusDefault,
        { backgroundColor: theme.backgroundColorCard },
      ]}
    >
      {/* <CardModal
        modalRef={modalRef}
        jobItem={jobItem}
        actionType={"edit"}
        headerText={"Edit a job"}
        theme={theme}
        // modalVisible={editModalVisible}
        onClose={() => modalRef.current?.close()}
        autoFillData={jobItem}
        section={jobItem.sectionName}
      /> */}
      <RecategorizeModal
        theme={theme}
        shown={recategorizeModalVisible}
        setShown={setRecategorizeModalVisible}
        sectionName={jobItem.sectionName}
        jobItem={jobItem}
      />
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.title, { color: theme.textColorCard }]}>
          {capitalizeFirstLetter(jobItem.from)}
        </Text>
        <View style={{ position: "absolute", top: 3, right: 3 }}>
          <PopUpMenu theme={theme} />
        </View>
      </View>
      <ViaBadge theme={theme} via={jobItem.via} />
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
    padding: 10,
  },
});

export default Card;
