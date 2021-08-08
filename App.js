import React, { useState, useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./src/screens/SettingsScreen";
import SectionScreen from "./src/screens/SectionScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AuthSplashScreen from "./src/screens/AuthSplashScreen";
// import { Feather } from "@expo/vector-icons";
import Gear from "react-native-bootstrap-icons/icons/gear";
import House from "react-native-bootstrap-icons/icons/house";
import { AppearanceProvider } from "react-native-appearance";
import {
  LogBox,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Animated, { color } from "react-native-reanimated";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import ThemeContext, { ThemeProvider } from "./src/context/ThemeContext";
import NotifyContext, { NotifyProvider } from "./src/context/NotifyContext";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const Root = () => {
  const { theme, darkTheme } = useContext(ThemeContext);
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

const BottomTabs = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <BottomTab.Navigator
      shifting={true}
      barStyle={{ backgroundColor: theme.backgroundColor }}
      activeColor={theme.textColorCard}
      inactiveColor={theme.textColorCard}
    >
      <BottomTab.Screen
        name="Home"
        component={TopTabs}
        options={{
          tabBarIcon: () => (
            <House color={theme.textColorCard} height={20} width={20} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => (
            <Gear color={theme.textColorCard} height={20} width={20} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TopTabs = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <TopTab.Navigator
      tabBar={(props) => (
        <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
          <Tab {...props} />
        </SafeAreaView>
      )}
      tabBarOptions={{
        activeTintColor: theme.boxText,
        inactiveTintColor: theme.textColorLight,
        indicatorStyle: { backgroundColor: theme.colorPrimary, height: 0 },
        labelStyle: { fontWeight: "600" },
        tabStyle: {
          margin: 2,
          backgroundColor: theme.boxBackground,
          borderRadius: 15,
        },
      }}
    >
      <TopTab.Screen
        name="Applied"
        component={SectionScreen}
        initialParams={{
          params: {
            //-{"unfortunately" "regret" "interview" "congratulations" "purchase" "registration" "entertainment"} "application" {"applied" "submitted" "received" "confirmed" "successful" "applying"} after:2020/01/01
            name: "Applied",
            mustContain: `-{"unfortunately" "regret" "customer" "interview" "congratulations" "purchase" "registration" "entertainment"} "application"`,
            has: `{"applied" "submitted" "received" "confirmed" "successful" "received your application" "applying"}`,
          },
        }}
        options={{
          title: "Applied ✅",
          tabBarTestID: "Applied",
        }}
      />
      <TopTab.Screen
        name="Rejected"
        component={SectionScreen}
        initialParams={{
          params: {
            name: "Rejected",
            mustContain: `-{ "registration" } "application" "thank"`,
            has: `{"unfortunately" "regret" "after careful consideration" "after careful review" "not able" "sorry to inform" "not to move forward" "decided to pursue"}`,

            //   mustContain: `-{"received" "submitted"} "thank you" "application"`,
            //   has: `{"Thank you for your interest" "not to progress" "Thank you for your application"
            //   "Thank you very much for your application" "regret to inform you" "unfortunately" "After careful consideration"
            //   "after thoughtful consideration" "we are not able to move forward in the recruiting process with you"
            //   "we would like to thank you for your applicaton" "Thanks again for the time and effort"
            //   "after due consideration" "we will not be taking your application any further"
            //   "After careful consideration we have decided to not proceed" "after careful review" "decided to move ahead with some other candidates"
            //   "we decided to move forward with other candidates"
            //   "we have decided to continue forward in the process with other candidates" "We have received many"
            //   "Due to the volume of applications" "not move forward"
            // }`,
          },
        }}
        options={{
          title: "Rejected 😞",
          tabBarTestID: "Rejected",
        }}
      />
      <TopTab.Screen
        name="Interview"
        component={SectionScreen}
        initialParams={{
          params: {
            name: "Interview",
            mustContain: `-{"submitted" "receiving" "applying" "apply" "registration" } "application"`,
            has: `{"congratulation" "invitation" "interview" "first step"}`,
            // mustContain: `-{"unfortunately" "regret" "interest" "received" "submitted"} "thank you" "application"`,
            // has: `{"excited" "to move forward" "invitation" "interview" "next steps in our recruitment process" "first step in the process"
            // "Congratulations" "We are pleased to inform" }`,
          },
        }}
        options={{
          title: "Progress 🙏",
          tabBarTestID: "Interview",
        }}
      />
    </TopTab.Navigator>
  );
};

const Tab = ({ state, descriptors, navigation, position }) => {
  const { theme } = useContext(ThemeContext);
  const { setBadge, getBadge } = useContext(NotifyContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 5,
        marginTop: StatusBar.currentHeight,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const name = options.tabBarTestID;

        if (isFocused) {
          // console.log(getBadge(name).visible);
          useEffect(() => {
            if (getBadge(name).visible) {
              setBadge(name, false, 0);
            }
          }, [name]);
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            setBadge(name, false, 0);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });
        const opacityShadow = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 0.05 : 0.0)),
        });
        const shadowSpread = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });
        return (
          <View
            key={options.title}
            style={{ flex: 1, height: 40, margin: 5, justifyContent: "center" }}
          >
            <Animated.View
              style={{
                opacity: opacity,
                flex: 1,
                backgroundColor: theme.boxBackground,
                borderRadius: 8,
                zIndex: -1,
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                justifyContent: "center",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowColor: "#000",
                shadowOpacity: opacityShadow,
                shadowRadius: shadowSpread,
              }}
            ></Animated.View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{}}
            >
              <Text
                style={{
                  color: theme.textColorCard,
                  alignSelf: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
            <Badge
              visible={getBadge(name).visible}
              value={getBadge(name).value}
            />
          </View>
        );
      })}
    </View>
  );
};

const Badge = ({ visible, value }) => {
  return visible ? (
    <View
      style={{
        position: "absolute",
        top: -3,
        right: -3,
        height: 20,
        minWidth: 20,
        borderRadius: 100,
        backgroundColor: "#F10000",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: "#FFF",
          padding: 3,
          fontSize: 14,
          alignSelf: "center",
          alignContent: "center",
        }}
      >
        {value}
      </Text>
    </View>
  ) : null;
};

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
                  <NotifyProvider>
                    <StatusBar animated={true} />
                    <Root />
                  </NotifyProvider>
                </UserProvider>
              </NavigationContainer>
            );
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};
