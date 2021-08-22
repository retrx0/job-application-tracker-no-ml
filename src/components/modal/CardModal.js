import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Styles from "../../styles/Styles";
import ModalButton from "./ModalButton";

const CardModal = ({ theme, modalVisible, onClose }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
        <CustomInput text={"Company"} theme={theme} />
        <CustomInput text={"Via"} theme={theme} />

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
            Date
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          maximumDate={new Date()}
          minimumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 2))
          }
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            console.log(
              "Picked Date: " +
                date.getFullYear() +
                "/" +
                date.getMonth() +
                "/" +
                date.getDay()
            );
            setDatePickerVisibility(false);
          }}
          onCancel={() => {
            console.log("Date Picking Canceled");
            setDatePickerVisibility(false);
          }}
        />
        <ModalButton title={"Save"} theme={theme} onPress={() => onClose()} />
      </View>
    </Modal>
  );
};

const CustomInput = ({ text, theme }) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
      <View style={[Styles.dropShadow]}>
        <TextInput style={[styles.input]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 80,
    margin: 10,
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
});

export default CardModal;
