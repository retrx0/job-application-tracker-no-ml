import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Styles from "../styles/Styles";

export default ModalButton = ({ onPress, title, theme }) => {
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
          Styles.dropShadow,
          Styles.AppBorderRadiusDefault,
          {
            backgroundColor: theme.boxBackground,
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
