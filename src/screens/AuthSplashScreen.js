import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";

const AuthSplashScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const resolve = async () => {
      const _token = await AsyncStorage.getItem("@token");
      if (_token !== null) {
        navigation.replace("Main", { screen: "Home" });
      } else {
        navigation.replace("Login");
      }
    };
    setTimeout(resolve, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
          marginTop: StatusBar.currentHeight,
        }}
      >
        <Text
          style={{
            fontSize: 45,
            textAlign: "center",
            color: theme.textColorCard,
            fontWeight: "400",
          }}
        >
          JobYoke
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthSplashScreen;
