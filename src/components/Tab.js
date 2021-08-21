import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import Badge from "./badge/Badge";
import ThemeContext from "../context/ThemeContext";
import NotifyContext from "../context/NotifyContext";
import Animated from "react-native-reanimated";

export default Tab = ({ state, descriptors, navigation, position }) => {
  const { theme } = useContext(ThemeContext);
  const { setBadge, getBadge } = useContext(NotifyContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 5,
        // marginTop: StatusBar.currentHeight,
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
          outputRange: inputRange.map((i) => (i === index ? 0.08 : 0.0)),
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
