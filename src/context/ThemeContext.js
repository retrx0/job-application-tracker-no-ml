import { useColorScheme, Appearance } from "react-native";
import { useTheme, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";

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
  const [change, setChange] = useState();

  useEffect(() => {
    Appearance.addChangeListener(async ({ colorScheme }) => {
      const _sys_theme = await AsyncStorage.getItem("@auto-dark-mode");
      if (_sys_theme === "true") {
        setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
      }
    });

    AsyncStorage.multiGet(["@dark-mode", "@auto-dark-mode"]).then((res) => {
      if (res !== null) {
        const darkmode = res[0][1];
        const auto_dark_mode = res[1][1];
        if (auto_dark_mode === "true") {
          sys_theme === "dark" ? setTheme(darkTheme) : setTheme(lightTheme);
        } else {
          darkmode === "true" ? setTheme(darkTheme) : setTheme(lightTheme);
        }
      } else {
        sys_theme === "dark" ? setTheme(darkTheme) : setTheme(lightTheme);
      }
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
