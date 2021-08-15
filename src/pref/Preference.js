import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TouchableOpacity, Switch } from "react-native";

export default Preference = ({
  prefName,
  name,
  value,
  onChange,
  disabled,
  theme,
}) => {
  const storePrefChange = async () => {
    await AsyncStorage.setItem(
      `${prefName}`,
      value === false ? "true" : "false"
    );
    let k = await AsyncStorage.getAllKeys();
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 20,
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: 5,
          margin: 5,
          height: 50,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 10,
            fontSize: 18,
            color: theme.textColor,
          }}
        >
          {name}
        </Text>
        <Switch
          value={value}
          disabled={disabled}
          onValueChange={(val) => {
            onChange(val);
            storePrefChange();
          }}
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 10,
          }}
        />
      </View>
      {/* <Divider style={{ width: "80%", margin: 20 }} /> */}
    </View>
  );
};
