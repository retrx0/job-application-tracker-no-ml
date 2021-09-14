import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Styles from "../../styles/Styles";

const CardModalInput = ({ inputLabel, theme, onChange, autoFillText }) => {
  return (
    <View style={{}}>
      <Text style={[styles.title, { color: theme.textColorCard }]}>
        {inputLabel}
      </Text>
      <View
        style={[
          Styles.AppBorderRadiusSmall,

          {
            backgroundColor: theme.backgroundColor,
            flexDirection: "row",
            justifyContent: "center",
          },
        ]}
      >
        <TextInput
          autoCapitalize={"none"}
          defaultValue={autoFillText}
          onChangeText={onChange}
          style={[
            styles.input,
            Styles.AppBorderRadiusSmall,
            Styles.dropShadow,
            {
              backgroundColor: theme.backgroundColorAlt,
              fontSize: 20,
              color: theme.textColor,
              padding: 10,
              alignContent: "stretch",
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 10,
    fontWeight: "500",
    textAlign: "left",
  },
});

export default CardModalInput;
