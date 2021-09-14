import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Styles from "../../styles/Styles";

export default ModalButton = ({ onPress, title, theme, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      style={{
        alignItems: "center",
        padding: 5,
        alignSelf: "center",
      }}
      onPress={onPress}
    >
      <View
        style={[
          !disabled ? Styles.dropShadow : {},
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
            color: !disabled ? theme.textColorCard : theme.textColorLight,
            fontSize: 22,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
