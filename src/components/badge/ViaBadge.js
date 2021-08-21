import React from "react";
import { View, Text } from "react-native";
import Styles from "../../styles/Styles";

const ViaBadge = ({ theme, via }) => {
  return (
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
  );
};

export default ViaBadge;
