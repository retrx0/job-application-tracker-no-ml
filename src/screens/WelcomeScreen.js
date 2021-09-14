import React, { useState, useContext } from "react";
import { View } from "react-native";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import PrivacyPolicyModal from "../components/modal/PrivacyPolicyModal";
import StartDateModal from "../components/modal/StartDateModal";

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [showDataPickerModal, setShowDataPickerModal] = useState(true);
  const [showPrivacyNoticeScreen, setShowPrivacyNoticeScreen] = useState(false);
  const { startDate, setStartDate } = useContext(UserContext);

  const dateModalOnPress = () => {
    try {
      setShowDataPickerModal((p) => !p);
      setShowPrivacyNoticeScreen((p) => !p);
    } catch (error) {
      console.error(error);
      navigation.navigate("Login");
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
      <StartDateModal
        theme={theme}
        visible={showDataPickerModal}
        onClose={dateModalOnPress}
        navigation={navigation}
      />
      <PrivacyPolicyModal
        privacyShown={showPrivacyNoticeScreen}
        buttonTitle={"Agree"}
        onClose={privacyModalOnPress}
        theme={theme}
      />
    </View>
  );
};

export default WelcomeScreen;
