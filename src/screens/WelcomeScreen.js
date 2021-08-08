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
// import DatePicker from "react-native-date-picker";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import { PrivacyPolicyText } from "../files/Privacy";

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { startDate, setStartDate } = useContext(UserContext);
  const [showDataPickerModal, setShowDataPickerModal] = useState(true);
  const [showPrivacyNoticeScreen, setShowPrivacyNoticeScreen] = useState(false);

  const [date, setDate] = useState("");

  const dateModalOnPress = () => {
    const year = new Date().getFullYear();
    let dateInString = String(date);
    if (dateInString.length === 4) {
      dateInString = `${dateInString}-01`;
    }
    if (
      dateInString.length !== 0 &&
      dateInString.length === 7 &&
      parseInt(dateInString.substring(0, 4)) < year
    ) {
      try {
        const d = new Date(`${dateInString}-01`);
        if (d instanceof Date && !isNaN(d)) {
          setStartDate(`${dateInString}/01`);
          setShowDataPickerModal((p) => !p);
          setShowPrivacyNoticeScreen((p) => !p);
        } else {
          Alert.alert("Invalid input", "Date must be of format YYYY-MM");
        }
      } catch (e) {
        Alert.alert("Invalid input", "Date must be of format YYYY-MM");
      }
    } else {
      Alert.alert("Invalid input", "Date must be of format YYYY-MM");
    }
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
          <TextInput
            style={[
              {
                alignSelf: "center",
                backgroundColor: theme.backgroundColorAlt,
                color: theme.textColor,
                width: 200,
                height: 50,
                fontSize: 20,
                borderRadius: 8,
                margin: 5,
              },
              styles.dropShadow,
            ]}
            textAlign={"center"}
            textAlignVertical={"center"}
            keyboardType={"numbers-and-punctuation"}
            autoCorrect={false}
            autoCapitalize={"none"}
            returnKeyType={"done"}
            placeholder="2021-01"
            maxLength={7}
            underlineColorAndroid={theme.colorPrimary}
            placeholderTextColor={theme.textColorLight}
            onChangeText={(t) => setDate(t)}
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
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <ScrollView
            style={{
              flex: 1,
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

const ModalButton = ({ onPress, title, theme }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        padding: 5,
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
      }}
      onPress={onPress}
    >
      <View
        style={[
          styles.dropShadow,
          {
            backgroundColor: theme.boxBackground,
            borderRadius: 8,
            padding: 5,
          },
        ]}
      >
        <Text
          style={{
            padding: 5,
            color: theme.textColorCard,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default WelcomeScreen;
