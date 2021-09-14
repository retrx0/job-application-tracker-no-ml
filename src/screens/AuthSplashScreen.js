import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, StatusBar, Text } from "react-native";
import Keys from "../auth/Keys";
import ThemeContext from "../context/ThemeContext";

const AuthSplashScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const resolve = async () => {
      const _token = await AsyncStorage.getItem(Keys.token);
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
          Jobbook
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthSplashScreen;
