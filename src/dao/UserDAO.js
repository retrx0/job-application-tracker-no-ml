import AsyncStorage from "@react-native-async-storage/async-storage";
import Keys from "../auth/Keys";

export const getStoredUserInfo = async () => {
  try {
    const user = await AsyncStorage.getItem(Keys.token);
    return user !== null ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Could not get Token: " + error);
  }
};

export const getStoredToken = async () => {
  try {
    const accToken = await getStoredUserInfo();
    return accToken !== null ? accToken.accessToken : null;
  } catch (error) {
    console.error("Could not get Token: " + error);
  }
};

export const storeUserInfo = (info) => {
  try {
    AsyncStorage.setItem(Keys.token, JSON.stringify(info));
  } catch (error) {
    console.error("Could not set Token: " + error);
  }
};
