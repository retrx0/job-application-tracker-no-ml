import React from "react";
import { View, Text } from "react-native";
import Styles from "../../styles/Styles";

const ViaBadge = ({ theme, via }) => {
  const _split_via = String(via).split(".");
  if (_split_via[1] === "com") via = _split_via[0];
  return via ? (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      <View
        style={[
          Styles.AppBorderRadiusDefault,
          {
            justifyContent: "flex-start",
            margin: 5,
            marginLeft: 15,
            backgroundColor: theme.boxBackground,
          },
        ]}
      >
        <Text
          style={[
            {
              fontSize: 16,
              padding: 6,
              paddingHorizontal: 15,
              fontWeight: "500",
              color: theme.textColorSuccess,
            },
          ]}
        >
          {via ? "via " + via : ""}
        </Text>
      </View>
    </View>
  ) : (
    <View style={{ margin: 5 }}></View>
  );
};

export default ViaBadge;
