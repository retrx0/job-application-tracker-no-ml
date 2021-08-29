import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { LogBox, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import ThemeContext, { ThemeProvider } from "./src/context/ThemeContext";
import { NotifyProvider } from "./src/context/NotifyContext";
import { MenuProvider } from "react-native-popup-menu";
import { JobCardProvider } from "./src/context/JobCardContext";
import Root from "./src/components/nav/Root";

export default App = () => {
  LogBox.ignoreAllLogs();
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => {
            return (
              <NavigationContainer theme={theme}>
                <UserProvider>
                  <MenuProvider>
                    <NotifyProvider>
                      <JobCardProvider>
                        <StatusBar animated={true} />
                        <Root />
                      </JobCardProvider>
                    </NotifyProvider>
                  </MenuProvider>
                </UserProvider>
              </NavigationContainer>
            );
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};
