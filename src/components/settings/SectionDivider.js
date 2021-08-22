import React from "react";
import { View, Text } from "react-native";

const SectionDivider = ({ title, theme }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Text style={{ color: theme.textColorLight, fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default SectionDivider;
