import React, { useContext, useState } from "react";
import { Modal, View, Image, Text, TouchableOpacity } from "react-native";
import ModalButton from "./ModalButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDateInStringWithSlashes } from "../../util/TimeUtil";
import UserContext from "../../context/UserContext";

const StartDateModal = ({ theme, visible, onClose, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { startDate, setStartDate } = useContext(UserContext);
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={visible}
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          backgroundColor: theme.backgroundColor,
        }}
      >
        <Image
          source={require("../../img/date.png")}
          resizeMethod={"auto"}
          style={{ width: 250, height: 250, alignSelf: "center" }}
        />
        <Text
          style={{
            color: theme.textColor,
            fontSize: 20,
            fontWeight: "400",
            textAlign: "center",
            padding: 20,
          }}
        >
          Tell us when you started applying for jobs, this will save us some
          time to find and track your applications
        </Text>
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
            {startDate}
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
            try {
              console.log("Picked Date: " + getDateInStringWithSlashes(date));
              setStartDate(getDateInStringWithSlashes(date));
              setDatePickerVisibility(false);
            } catch (err) {
              console.error(err);
              navigation.navigate("Login");
            }
          }}
          onCancel={() => {
            console.log("Date Picking Canceled");
            setDatePickerVisibility(false);
          }}
        />
        <ModalButton title="Next" onPress={onClose} theme={theme} />
      </View>
    </Modal>
  );
};

export default StartDateModal;
