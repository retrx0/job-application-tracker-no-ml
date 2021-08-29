import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Gear from "react-native-bootstrap-icons/icons/gear";
import House from "react-native-bootstrap-icons/icons/house";
import TopTabs from "./TopTabs";
import SettingsScreen from "../../screens/SettingsScreen";

const BottomTab = createMaterialBottomTabNavigator();

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

export default BottomTabs;
