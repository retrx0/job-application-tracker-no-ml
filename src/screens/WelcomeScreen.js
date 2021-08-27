import React, { useState, useContext } from "react";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import ModalButton from "../components/modal/ModalButton";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import { PrivacyPolicyText } from "../files/Privacy";
import Styles from "../styles/Styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { startDate, setStartDate } = useContext(UserContext);
  const [showDataPickerModal, setShowDataPickerModal] = useState(true);
  const [showPrivacyNoticeScreen, setShowPrivacyNoticeScreen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dateModalOnPress = () => {
    setShowDataPickerModal((p) => !p);
    setShowPrivacyNoticeScreen((p) => !p);
  };
  const privacyModalOnPress = () => {
    setShowPrivacyNoticeScreen((p) => !p);
    navigation.navigate("Main", {
      screen: "Home",
      params: { startDate },
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showDataPickerModal}
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 50,
            justifyContent: "flex-start",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <Image
            source={require("../img/date.png")}
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
              console.log(
                "Picked Date: " +
                  date.getFullYear() +
                  "/" +
                  date.getMonth() +
                  "/" +
                  date.getDay()
              );
              setStartDate(
                date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay()
              );
              setDatePickerVisibility(false);
            }}
            onCancel={() => {
              console.log("Date Picking Canceled");
              setDatePickerVisibility(false);
            }}
          />
          <ModalButton title="Next" onPress={dateModalOnPress} theme={theme} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showPrivacyNoticeScreen}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.backgroundColor,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <ScrollView
            style={{
              backgroundColor: theme.backgroundColor,
              padding: 10,
            }}
          >
            <PrivacyPolicyText theme={theme} />
          </ScrollView>
          <ModalButton
            title="Agree"
            onPress={privacyModalOnPress}
            theme={theme}
          />
        </View>
      </Modal>
    </View>
  );
};

export default WelcomeScreen;
