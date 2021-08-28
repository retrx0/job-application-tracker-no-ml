import React from "react";
import { View, ActivityIndicator, Text, Modal } from "react-native";

const ActivityModal = ({ theme, modalVisible }) => {
  return (
    <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          size={"large"}
          color={theme.textColor}
        />
        {
          <Text style={{ color: theme.textColor, fontSize: 16, margin: 10 }}>
            Please wait a bit...
          </Text>
        }
      </View>
    </Modal>
  );
};

export default ActivityModal;
