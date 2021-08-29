import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getCurrentDateInSeconds } from "../util/TimeUtil";

export const getStoredSectionJobs = async (key) => {
  const data = await AsyncStorage.getItem(key);
  if (data !== null) {
    console.log("Saved emails found in storage");
    return JSON.parse(data);
  } else {
    return null;
  }
};

export const storeSectionJobs = (key, value) => {
  AsyncStorage.setItem(key, JSON.stringify(value))
    .then(() => {
      console.log("Saved jobs to async storage");
    })
    .catch((e) => {
      console.log("error while saving jobs: " + e);
      Alert.alert("Something went wrong", "There was a problem saving emails");
    });
};

export const getStoredTimeStamp = async (sectionName) => {
  return await AsyncStorage.getItem(`@${sectionName}-time-stamp`);
};

export const storeTimeStamp = (sectionName) => {
  let stamp = getCurrentDateInSeconds();
  AsyncStorage.setItem(`@${sectionName}-time-stamp`, JSON.stringify(stamp));
};
