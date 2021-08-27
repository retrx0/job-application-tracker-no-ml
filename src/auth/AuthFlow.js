import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import { Alert } from "react-native";
import { getToken } from "../dao/UserDAO";
import { credentials } from "./Credentials";
import Keys from "./Keys";
import * as Google from "expo-google-app-auth";

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
    const stored_result = await getToken();
    const welcomModalShown = await AsyncStorage.getItem(Keys.welcomeModal);
    if (stored_result !== null) {
      setUser(JSON.parse(stored_result));
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
    console.log(e);
    navigation.navigate("Login");
    Alert.alert(
      "Login Problem",
      "There was a problem when trying to login, please close the application and open again if problem persist"
    );
  }
};

const logOutFlow = async ({ navigation }) => {
  const accToken = await getToken();
  if (accToken !== null) {
    var tmp = JSON.parse(accToken).accessToken;
    Google.logOutAsync({
      accessToken: tmp,
      iosClientId: credentials.iosClientId,
      androidClientId: credentials.androidClientId,
    }).then(() => {
      navigation.navigate("Login");
      AsyncStorage.clear()
        .then(() => {})
        .catch((e) => console.log(e));
    });
  }
};
