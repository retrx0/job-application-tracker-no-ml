import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Styles from "../../styles/Styles";

const CardModalInput = ({ inputLabel, theme, onChange, autoFillText }) => {
  return (
    <View style={{}}>
      <Text style={[styles.title, { color: theme.textColor }]}>
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
          autoCorrect={true}
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
              padding: 5,
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
    height: 40,
    width: 350,
    margin: 10,
  },
  title: {
    fontSize: 22,
    padding: 10,
    borderRadius: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CardModalInput;
