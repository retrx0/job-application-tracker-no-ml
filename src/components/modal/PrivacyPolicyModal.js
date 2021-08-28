import React from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView } from "react-native";
import { PrivacyPolicyText } from "../../files/Privacy";

const PrivacyPolicyModal = ({ theme, privacyShown, setPrivacyShown }) => {
  return (
    <Modal
      presentationStyle="pageSheet"
      visible={privacyShown}
      style={{ flex: 1, backgroundColor: theme.backgroundColor }}
      animationType="slide"
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

      <TouchableOpacity
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
        }}
        onPress={() => setPrivacyShown((p) => !p)}
      >
        <View
          style={{
            padding: 5,
            backgroundColor: theme.backgroundColor,
            borderRadius: 8,
            borderColor: theme.borderColor,
          }}
        >
          <Text style={{ color: theme.textColorCard, fontSize: 22 }}>
            Close
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PrivacyPolicyModal;
