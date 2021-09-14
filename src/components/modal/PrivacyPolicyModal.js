import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { PrivacyPolicyText } from "../../files/Privacy";
import ModalButton from "./ModalButton";

const PrivacyPolicyModal = ({ theme, privacyShown, onClose, buttonTitle }) => {
  return (
    <Modal
      presentationStyle="pageSheet"
      visible={privacyShown}
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
      }}
      animationType="slide"
    >
      <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
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
          <ModalButton title={buttonTitle} onPress={onClose} theme={theme} />
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyPolicyModal;
