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
      </View>
    </Modal>
  );
};

export default ActivityModal;
