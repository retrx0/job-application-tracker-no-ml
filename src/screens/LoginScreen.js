import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContext";
import ThemeContext from "../context/ThemeContext";
import NotifyContext from "../context/NotifyContext";
import { credentials } from "../auth/Auth";

export const isAndroid = () => Platform.OS === "android";

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      clientId: isAndroid()
        ? credentials.androidClientId
        : credentials.iosClientId,
      iosClientId: credentials.iosClientId,
      androidClientId: credentials.androidClientId,
      scopes: credentials.scopes,
    });

    if (result.type === "success") {
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const loginAuth = async ({ navigation, user, setUser, setAndSaveUser }) => {
  try {
    const stored_result = await AsyncStorage.getItem("@token");
    const welcomModalShown = await AsyncStorage.getItem("@welcome-modal");
    if (stored_result !== null) {
      setUser(JSON.parse(stored_result));
      welcomModalShown !== null
        ? navigation.navigate("Main", {
            screen: "Home",
          })
        : navigation.navigate("Welcome");
      AsyncStorage.setItem("@welcome-modal", "true");
    } else {
      var result = await signInWithGoogleAsync();
      if (result.cancelled === true) {
        navigation.navigate("Login");
      } else if (result.error === true) {
        navigation.navigate("Login");
      } else {
        setAndSaveUser(result);
        welcomModalShown !== null
          ? navigation.navigate("Main", {
              screen: "Home",
            })
          : navigation.navigate("Welcome");
        AsyncStorage.setItem("@welcome-modal", "true");
      }
    }
  } catch (e) {
    console.log(e);
    navigation.navigate("Login");
    Alert.alert(
      "Login Problem",
      "There was a problem when trying to login, please close the application and open again if problem persist"
    );
  }
};

const LoginScreen = ({ navigation }) => {
  const { user, setUser, setAndSaveUser } = useContext(UserContext);
  const { theme, darkTheme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Text style={[styles.title, { color: theme.textColor }]}>Login</Text>
      <Image
        source={require("../img/recruit-track.png")}
        resizeMethod={"auto"}
        style={{
          margin: 15,
          height: 300,
          width: 400,
          alignSelf: "center",
        }}
      />
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() =>
            loginAuth({ navigation, setUser, setAndSaveUser, user })
          }
        >
          <View
            style={[
              styles.button,
              styles.dropShadow,
              { backgroundColor: "#fff" },
            ]}
          >
            <Image
              source={require("../../assets/google.png")}
              resizeMethod={"auto"}
              style={{ height: 30, width: 30, marginHorizontal: 5 }}
            />
            <Text>Continue with Gmail</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 10,
    marginTop: 30,
    margin: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default LoginScreen;
