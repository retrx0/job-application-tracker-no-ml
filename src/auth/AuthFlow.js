import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import { Alert } from "react-native";
import { getStoredToken, getStoredUserInfo } from "../dao/UserDAO";
import { credentials, isAndroid } from "./Credentials";
import Keys from "./Keys";

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

export const loginAuth = async ({
  navigation,
  user,
  setUser,
  setAndSaveUser,
}) => {
  try {
    const stored_result = await getStoredUserInfo();
    const welcomModalShown = await AsyncStorage.getItem(Keys.welcomeModal);
    if (stored_result !== null) {
      setUser(stored_result);
      welcomModalShown !== null
        ? navigation.navigate("Main", {
            screen: "Home",
          })
        : navigation.navigate("Welcome");
      AsyncStorage.setItem(Keys.welcomeModal, "true");
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
        AsyncStorage.setItem(Keys.welcomeModal, "true");
      }
    }
  } catch (e) {
    console.error(e);
    navigation.navigate("Login");
    Alert.alert(
      "Login Problem",
      "There was a problem when trying to login, please close the application and open again if problem persist"
    );
  }
};

export const logOutFlow = async ({ navigation }) => {
  const accToken = await getStoredToken();

  if (accToken !== null) {
    Google.logOutAsync({
      accessToken: accToken,
      iosClientId: credentials.iosClientId,
      androidClientId: credentials.androidClientId,
    }).then(() => {
      navigation.navigate("Login");
      AsyncStorage.clear()
        .then(() => {})
        .catch((e) => console.error(e));
    });
  }
};
