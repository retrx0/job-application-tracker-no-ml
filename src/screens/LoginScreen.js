import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import UserContext from "../context/UserContext";
import ThemeContext from "../context/ThemeContext";
import Styles from "../styles/Styles";
import { loginAuth } from "../auth/AuthFlow";

const LoginScreen = ({ navigation }) => {
  const { user, setUser, setAndSaveUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Text style={[styles.title, { color: theme.textColor }]}>Login</Text>
      <Image
        source={require("../img/recruit-track.png")}
        resizeMethod={"auto"}
        style={{
          margin: 15,
          height: 300,
          width: 400,
          alignSelf: "center",
        }}
      />
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() =>
            loginAuth({ navigation, setUser, setAndSaveUser, user })
          }
        >
          <View
            style={[
              styles.button,
              Styles.dropShadow,
              Styles.AppBorderRadiusDefault,
              { backgroundColor: "#fff" },
            ]}
          >
            <Image
              source={require("../../assets/google.png")}
              resizeMethod={"auto"}
              style={{ height: 30, width: 30, marginHorizontal: 5 }}
            />
            <Text>Continue with Gmail</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 10,
    marginTop: 30,
    margin: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
});

export default LoginScreen;
