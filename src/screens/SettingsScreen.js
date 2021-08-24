import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  Modal,
  Button,
  Share,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import { Divider } from "react-native-elements";
import ThemeContext from "../context/ThemeContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import marked from "marked";
import { PrivacyPolicyText } from "../files/Privacy";
import WebView from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";
import PreferenceButton from "../pref/PreferenceButton";
import Preference from "../pref/Preference";
import Keys from "../auth/Keys";
import Styles from "../styles/Styles";
import ProfileView from "../components/settings/ProfileView";
import SectionDivider from "../components/settings/SectionDivider";

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [autoDarkMode, setAutoDarkMode] = useState(false);
  const [privacyShown, setPrivacyShown] = useState(false);
  const { theme, setTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const sys_theme = useColorScheme();

  useEffect(() => {
    AsyncStorage.multiGet([Keys.autoDarkMode, Keys.darkMode]).then((data) => {
      if (data !== null) {
        const adm = data[0][1] === "true" ? true : false;
        const dm = data[1][1] === "true" ? true : false;
        setDarkMode(dm);
        setAutoDarkMode(adm);
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <SafeAreaView>
        <Text style={[styles.title, { color: theme.textColor }]}>Settings</Text>
        <ProfileView theme={theme} />
        <SectionDivider title="Appearance" theme={theme} />
        <Preference
          prefName={Keys.autoDarkMode}
          value={autoDarkMode}
          disabled={false}
          onChange={(p) => {
            if (p === true) {
              setDarkMode(false);
              sys_theme === "dark" ? setTheme(darkTheme) : setTheme(lightTheme);
            } else {
              darkMode ? setTheme(darkTheme) : setTheme(lightTheme);
            }
            setAutoDarkMode((k) => !k);
          }}
          theme={theme}
          name="Auto dark mode"
        />
        <Preference
          prefName={Keys.darkMode}
          value={darkMode}
          disabled={autoDarkMode}
          onChange={(p) => {
            setDarkMode((k) => !k);
            p ? setTheme(darkTheme) : setTheme(lightTheme);
          }}
          theme={theme}
          name="Dark mode"
        />
        <PreferenceButton
          title="Share"
          iconName="ios-share"
          theme={theme}
          onPress={onShare}
        />
        <PreferenceButton
          title="Privacy Policy"
          iconName="privacy-tip"
          theme={theme}
          onPress={() => setPrivacyShown((p) => !p)}
        />
        <TouchableOpacity style={{}} onPress={() => logOutFlow({ navigation })}>
          <View
            style={[
              styles.button,
              Styles.dropShadow,
              {
                borderRadius: 8,
                backgroundColor: theme.boxBackground,
                color: theme.textColor,
              },
            ]}
          >
            <Text
              style={[
                { color: theme.textColor, fontSize: 18, fontWeight: "500" },
              ]}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          presentationStyle="pageSheet"
          visible={privacyShown}
          style={{ flex: 1, backgroundColor: theme.backgroundColor }}
          animationType="slide"
        >
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: theme.backgroundColor,
              padding: 10,
            }}
          >
            <PrivacyPolicyText theme={theme} />
          </ScrollView>

          <TouchableOpacity
            style={{
              alignItems: "center",
              position: "absolute",
              bottom: 50,
              left: 0,
              right: 0,
            }}
            onPress={() => setPrivacyShown((p) => !p)}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: theme.backgroundColorAlt,
                borderRadius: 8,
                borderColor: theme.borderColor,
                borderWidth: 1,
              }}
            >
              <Text style={{ color: theme.textColorCard, fontSize: 22 }}>
                Close
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const logOutFlow = async ({ navigation }) => {
  const accToken = await AsyncStorage.getItem("@token");
  if (accToken !== null) {
    var tmp = JSON.parse(accToken).accessToken;
    Google.logOutAsync({
      accessToken: tmp,
      iosClientId: `575965648407-6rss1rstcgm51q1roa1bhaljjkoni900.apps.googleusercontent.com`,
      androidClientId: `575965648407-v6itn1o9uuo9fqtrkr7tn3j6n6i712en.apps.googleusercontent.com`,
    }).then(() => {
      navigation.navigate("Login");
      AsyncStorage.clear()
        .then(() => {})
        .catch((e) => console.log(e));
    });
  }
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "JobYoke | Find and track your job applications",
      url: "https://www.jobyoke.com",
      title: "JobYoke",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 20,
    fontWeight: "500",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 80,
    height: 50,
  },
});

export default SettingsScreen;
