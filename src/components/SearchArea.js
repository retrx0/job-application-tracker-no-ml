import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Styles from "../styles/Styles";
import { TouchableOpacity } from "react-native";
import CardModal from "./modal/CardModal";

export default SearchArea = ({ emails, searchTerm, setSearchTerm, theme }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);

  return (
    <View style={[styles.search, { backgroundColor: theme.backgroundColor }]}>
      <View>
        <TouchableOpacity
          onPress={() => {
            setAddModalVisible(true);
          }}
          style={[
            styles.button,
            Styles.AppBorderRadiusSmall,
            {
              borderColor: theme.boxBackground,
              backgroundColor: theme.boxBackground,
            },
          ]}
        >
          <Feather style={{ color: theme.boxText }} size={20} name="plus" />
        </TouchableOpacity>
      </View>
      <CardModal
        theme={theme}
        modalVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />
      <View
        style={[
          {
            backgroundColor: theme.backgroundColorCard,
            flex: 1,
          },
          styles.search,
          Styles.dropShadow,
        ]}
      >
        <Feather
          name="search"
          size={20}
          style={{ padding: 5, color: theme.textColorLight }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.textColorLight}
          underlineColorAndroid={theme.backgroundColorCard}
          autoCapitalize={"none"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          returnKeyType={"search"}
          onChangeText={(text) => setSearchTerm(text)}
          style={[
            {
              height: 38,
              fontSize: 18,
              flex: 1,
              padding: 5,
              borderRadius: 10,
              color: theme.textColor,
              backgroundColor: theme.backgroundColorAlt,
              alignSelf: "center",
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.button,
          Styles.AppBorderRadiusSmall,
          {
            borderColor: theme.boxBackground,
            backgroundColor: theme.boxBackground,
            color: theme.boxText,
          },
        ]}
      >
        <Text
          style={{
            textAlignVertical: "center",
            fontSize: 18,
            fontWeight: "600",
            color: theme.boxText,
          }}
        >
          {emails.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    padding: 5,
    margin: 3,
  },
  button: {
    marginTop: 5,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  search: {
    marginTop: 10,
    margin: 5,
    flexDirection: "row",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
  },
});
