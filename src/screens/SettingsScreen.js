import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Share,
  useColorScheme,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "../context/ThemeContext";
import PreferenceButton from "../components/pref/PreferenceButton";
import Preference from "../components/pref/Preference";
import Keys from "../auth/Keys";
import ProfileView from "../components/settings/ProfileView";
import SectionDivider from "../components/settings/SectionDivider";
import { logOutFlow } from "../auth/AuthFlow";
import PrivacyPolicyModal from "../components/modal/PrivacyPolicyModal";
import ModalButton from "../components/modal/ModalButton";

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
            !p
              ? StatusBar.setBarStyle("dark-content")
              : StatusBar.setBarStyle("light-content");
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
        <ModalButton
          theme={theme}
          title={"Logout"}
          onPress={() => logOutFlow({ navigation })}
        />
        <PrivacyPolicyModal
          theme={theme}
          privacyShown={privacyShown}
          buttonTitle={"Close"}
          onClose={() => setPrivacyShown((p) => !p)}
        />
      </SafeAreaView>
    </View>
  );
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "JobYoke | Find and track your all job applications",
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
    console.error(error);
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
