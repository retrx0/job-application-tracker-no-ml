import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Styles from "../../styles/Styles";
import CardModalInput from "./CardModalInput";
import ModalButton from "./ModalButton";
import { Picker } from "@react-native-picker/picker";
import { addJob, modifyJob } from "../../controller/JobController";
import { getDateInString } from "../../util/TimeUtil";

const CardModal = ({
  theme,
  modalVisible,
  onClose,
  headerText,
  autoFillData,
  section,
  callBack,
  actionType,
  jobItem,
}) => {
  let _autoFillData = {};
  if (autoFillData) _autoFillData = autoFillData;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalCompanyName, setModalCompanyName] = useState(_autoFillData.from);
  const [modalVia, setModalVia] = useState(_autoFillData.via);
  const [modalDate, setModalDate] = useState(Math.floor(Date.now()));

  const [modalSelectedSection, setModalSelectedSection] = useState(section);

  useEffect(() => {
    setModalSelectedSection(section);
  }, []);

  return (
    <Modal
      animationType={"slide"}
      visible={modalVisible}
      presentationStyle="pageSheet"
    >
      <View
        style={{
          backgroundColor: theme.backgroundColor,
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={[styles.title, { fontSize: 30, color: theme.textColor }]}>
          {headerText}
        </Text>
        <CardModalInput
          autoFillText={_autoFillData.from}
          onChange={(t) => setModalCompanyName(t)}
          inputLabel={"Company"}
          theme={theme}
        />
        <CardModalInput
          autoFillText={_autoFillData.via}
          onChange={(t) => setModalVia(t)}
          inputLabel={"Via"}
          theme={theme}
        />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Text
            style={[
              {
                color: theme.textColor,
                padding: 10,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "400",
                color: theme.textColorCard,
              },
            ]}
          >
            {getDateInString(modalDate)}
          </Text>
        </TouchableOpacity>
        <Picker
          prompt={"Select Category"}
          style={[
            {
              backgroundColor: theme.backgroundColorAlt,
              margin: 10,
            },
            Styles.AppBorderRadiusSmall,
          ]}
          itemStyle={{ color: theme.textColor }}
          selectedValue={modalSelectedSection}
          onValueChange={(itemValue, itemIndex) =>
            setModalSelectedSection(itemValue)
          }
        >
          <Picker.Item label={"Applied"} value={"Applied"} />
          <Picker.Item label={"Reject"} value={"Rejected"} />
          <Picker.Item label={"Interview"} value={"Interview"} />
          <Picker.Item label={"Progress"} value={"Progress"} />
        </Picker>
        <DateTimePickerModal
          isDarkModeEnabled={theme.dark}
          textColor={theme.textColor}
          maximumDate={new Date()}
          minimumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 10))
          }
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setModalDate(Math.floor(date));
            setDatePickerVisibility(false);
          }}
          onCancel={() => {
            console.log("Date Picking Canceled");
            setDatePickerVisibility(false);
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ModalButton
            title={"Cancel"}
            theme={theme}
            onPress={() => {
              onClose();
            }}
          />
          <ModalButton
            title={"Save"}
            theme={theme}
            onPress={() => {
              console.log({
                modalCompanyName,
                modalVia,
                modalDate,
                modalSelectedSection,
              });
              switch (actionType) {
                case "edit":
                  modifyJob(
                    jobItem,
                    {
                      from: modalCompanyName,
                      date: modalDate,
                      via: modalVia,
                      sectionName: modalSelectedSection,
                    },
                    callBack
                  );
                  break;
                case "add":
                  addJob(
                    {
                      from: modalCompanyName,
                      date: modalDate,
                      via: modalVia,
                      sectionName: modalSelectedSection,
                    },
                    callBack
                  );
                  break;
                default:
                  break;
              }

              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    margin: 10,
  },
  title: {
    fontSize: 22,
    padding: 10,
    borderRadius: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    padding: 6,
    paddingHorizontal: 15,
  },
});

export default CardModal;
