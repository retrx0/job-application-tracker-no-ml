import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthSplashScreen from "../../screens/AuthSplashScreen";
import LoginScreen from "../../screens/LoginScreen";
import WelcomeScreen from "../../screens/WelcomeScreen";
import BottomTabs from "./BottomTabs";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator initialRouteName="AuthSplash" mode={"modal"}>
      <Stack.Screen
        name="AuthSplash"
        component={AuthSplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{
          headerTitle: "Home",
          headerLeft: () => null,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Root;
