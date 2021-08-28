import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default PreferenceButton = ({ title, iconName, theme, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          height: 40,
          paddingHorizontal: 20,
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.textColor,
            alignSelf: "flex-start",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <MaterialIcons
          style={{
            color: theme.textColorCard,
            alignSelf: "flex-end",
            fontSize: 18,
          }}
          name={iconName}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
};
