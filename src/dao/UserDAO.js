import AsyncStorage from "@react-native-async-storage/async-storage";
import Keys from "../auth/Keys";

export const getToken = async () => {
  try {
    const accToken = await AsyncStorage.getItem(Keys.token);
    return accToken !== null ? JSON.parse(accToken).accessToken : null;
  } catch (error) {
    console.error("Could not get Token: " + error);
  }
};

export const setToken = (token) => {
  try {
    AsyncStorage.setItem(Keys.token, JSON.stringify(token));
  } catch (error) {
    console.error("Could not set Token: " + error);
  }
};
