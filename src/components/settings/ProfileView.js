import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Keys from "../../auth/Keys";
import Styles from "../../styles/Styles";

const ProfileView = ({ theme }) => {
  const [result, setResult] = useState({
    user: {
      name: "",
      photoUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  });
  const getResult = () => {
    const res = AsyncStorage.getItem(Keys.token).then((r) => {
      setResult(JSON.parse(r));
      return JSON.parse(r);
    });
  };
  useEffect(() => {
    getResult();
  }, []);
  return (
    <View
      style={[
        styles.profile,
        Styles.dropShadow,
        Styles.AppBorderRadiusDefault,
        { backgroundColor: theme.backgroundColorAlt },
      ]}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 50, margin: 10 }}
        source={{ uri: result.user.photoUrl }}
      />
      <Text style={{ color: theme.textColor, fontSize: 20, fontWeight: "500" }}>
        {result.user.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    height: 80,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileView;
