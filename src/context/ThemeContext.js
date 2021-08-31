import { useColorScheme, Appearance, StatusBar } from "react-native";
import { useTheme, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Keys from "../auth/Keys";

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const darkTheme = {
    ...DarkTheme.colors,
    colors: {
      ...DarkTheme,
    },
    dark: true,
    textColor: "#fff",
    textColorLight: "#999",
    textColorCard: "#87B5FB",
    textColorCardBody: "#F5F5F5",
    textColorSuccess: "#999",
    textColorDanger: "#ED4D50",
    backgroundColor: "#000",
    backgroundColorAlt: "#151515",
    backgroundColorCard: "#151515",
    borderColor: "#333",
    boxBackground: "#2a2a2a",
    boxText: "#87B5FB",
    card: "#333",
    colorPrimary: "#5697FA",
    colorAlt: "#111",
  };
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme,
    },
    dark: false,
    textColor: "#000",
    textColorLight: "#999",
    textColorCard: "#1f76f9",
    textColorCardBody: "#3E444B",
    textColorSuccess: "#287A38",
    textColorDanger: "#FF0000",
    backgroundColor: "#FAFBFD",
    backgroundColorAlt: "#fff",
    backgroundColorCard: "#FFF",
    //F8F9FA
    borderColor: "#5697FA",
    boxBackground: "#E9F1FE",
    boxText: "#3583F9",
    card: "#fff",
    colorPrimary: "#1f76f9",
    colorAlt: "#000234",
  };

  const sys_theme = useColorScheme();
  const cur_theme = useTheme();
  const [theme, setTheme] = useState(
    sys_theme === "light" ? lightTheme : darkTheme
  );
  const [osTheme, setOsTheme] = useState(
    sys_theme === "light" ? lightTheme : darkTheme
  );

  useEffect(() => {
    Appearance.addChangeListener(async ({ colorScheme }) => {
      const _sys_theme = await AsyncStorage.getItem(Keys.autoDarkMode);
      if (_sys_theme === "true") {
        setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
      }
      colorScheme === "light"
        ? StatusBar.setBarStyle("dark-content")
        : StatusBar.setBarStyle("light-content");
    });

    AsyncStorage.multiGet([Keys.darkMode, Keys.autoDarkMode]).then((res) => {
      const darkmode = res[0][1];
      const auto_dark_mode = res[1][1];
      if (res !== null) {
        if (auto_dark_mode === "true") {
          sys_theme === "dark" ? setTheme(darkTheme) : setTheme(lightTheme);
        } else {
          darkmode === "true" ? setTheme(darkTheme) : setTheme(lightTheme);
        }
      } else {
        sys_theme === "dark" ? setTheme(darkTheme) : setTheme(lightTheme);
      }
      // darkmode === "true"
      //   ? StatusBar.setBarStyle("dark-content")
      //   : StatusBar.setBarStyle("light-content");
    });
  }, []);
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, darkTheme, lightTheme, setOsTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
