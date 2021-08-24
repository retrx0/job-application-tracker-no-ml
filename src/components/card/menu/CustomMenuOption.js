import React from "react";
import { View, Text } from "react-native";

import { MenuOption } from "react-native-popup-menu";

const CustomMenuOption = ({ text, onClick, textColor, IconComponent }) => {
  return (
    <MenuOption
      onSelect={() => {
        console.log("Selected:" + text);
        onClick();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <IconComponent
          style={{ justifyContent: "flex-start", marginTop: 5 }}
          color={textColor}
          height={20}
          width={20}
        />
        <Text
          style={{
            padding: 5,
            paddingLeft: 10,
            color: textColor,
            fontSize: 18,
            justifyContent: "flex-end",
          }}
        >
          {text}
        </Text>
      </View>
    </MenuOption>
  );
};

export default CustomMenuOption;
