import React from "react";
import { View, Text } from "react-native";

export default Badge = ({ visible, value }) => {
  return visible ? (
    <View
      style={{
        position: "absolute",
        top: -3,
        right: -3,
        height: 20,
        minWidth: 20,
        borderRadius: 100,
        backgroundColor: "#F10000",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: "#FFF",
          padding: 3,
          fontSize: 14,
          alignSelf: "center",
          alignContent: "center",
        }}
      >
        {value}
      </Text>
    </View>
  ) : null;
};
