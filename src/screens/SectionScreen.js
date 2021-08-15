import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
  VirtualizedList,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import ThemeContext from "../context/ThemeContext";
import { color } from "react-native-reanimated";
import UserContext from "../context/UserContext";
import NotifyContext from "../context/NotifyContext";
import { credentials } from "../auth/Auth";
import SearchArea from "../components/SearchArea";

export const isAndroid = () => Platform.OS === "android";

const SectionScreen = ({ navigation, route }) => {
  const { user, setUser, startDate } = useContext(UserContext);
  const [emails, setEmails] = useState([]);
  const sectionName = route.params.params.name;
  const mustContain = route.params.params.mustContain;
  const has = route.params.params.has;
  const [modalVisible, setModalVisible] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { setBadge, getBadge } = useContext(NotifyContext);

  useEffect(() => {

    //AsyncStorage.clear();

    const startApplyingDate = String(startDate).replace("-", "/");
    const get = async (constraint) => {
      // Fetch Emails
      const data = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${user.user.email}/messages?q=(${mustContain} ${has} ${constraint})`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
        .then((d) => d.json())
        .catch((e) => {
          throw new e();
        });
      let tmp = [];
      if (data.resultSizeEstimate > 0) {
        for (const i in data.messages) {
          const item = data.messages[i];
          const e = await getEmail({ user, item });
          tmp.push(e);
        }
        return [tmp, data];
      } else return [tmp, data];
    };

    const resolveModalAndSetDataWithBadge = (data, tmp_eml) => {
      console.log(data);
      if (data[0].length > 0) {
        setBadge(sectionName, true, data[0].length);
      }
      setEmails((e) => data[0].concat(e));
      setModalVisible((p) => !p);
      AsyncStorage.setItem(
        `@${sectionName}-emails`,
        JSON.stringify(data[0].concat(tmp_eml))
      );
    };

    //Check if emails are stored
    AsyncStorage.getItem(`@${sectionName}-emails`).then((res) => {
      if (res !== null) {
        console.log("Saved Emails Found, Fetching new emails");
        let _tmp_email = JSON.parse(res);
        setEmails(_tmp_email);
        AsyncStorage.getItem(`@${sectionName}-time-stamp`).then((time) => {
          if (time !== null) {
            console.log(time); //1614819682
            get(`after:${time}`).then((_data) => {
              console.log(_data);
              if (_data[1].error !== undefined) {
                console.log(
                  "Error, could not fetch new emails. Requesting new access token"
                );
                fetch(
                  `https://oauth2.googleapis.com/token?client_id=${
                    isAndroid()
                      ? credentials.androidClientId
                      : credentials.iosClientId
                  }&refresh_token=${
                    user.refreshToken
                  }&grant_type=refresh_token`,
                  {
                    method: "POST",
                  }
                )
                  .then((res) => res.json())
                  .then((__data) => {
                    if (__data.error === undefined) {
                      user.accessToken = __data.access_token;
                      setUser(user);
                      AsyncStorage.setItem("@token", JSON.stringify(user));
                      get(`after:${time}`).then((__eml) => {
                        resolveModalAndSetDataWithBadge(__eml, _tmp_email);
                      });
                    }
                  });
              } else {
                resolveModalAndSetDataWithBadge(_data, _tmp_email);
              }
            });
          }
        });
        let stamp = Math.floor(new Date().getTime() / 1000);
        AsyncStorage.setItem(
          `@${sectionName}-time-stamp`,
          JSON.stringify(stamp)
        );
      } else {
        console.log("No Saved Emails Found, Fetching new set of emails");
        // Store Emails
        const year = new Date().getFullYear();
        get(
          `after:${
            startApplyingDate.length === 0
              ? String(year - 2).concat("/01/01")
              : startApplyingDate
          }`
        ).then((_data_) => {
          setEmails(_data_[0]);
          let stamp = Math.floor(new Date().getTime() / 1000);
          AsyncStorage.setItem(
            `@${sectionName}-emails`,
            JSON.stringify(_data_[0])
          )
            .then(() => {
              setModalVisible((p) => !p);
              AsyncStorage.setItem(
                `@${sectionName}-time-stamp`,
                JSON.stringify(stamp)
              );
              console.log("successfully saved emails");
            })
            .catch((e) => {
              setModalVisible((p) => !p);
              Alert.alert(
                "Something went wrong",
                "There was a problem fetching emails"
              );
            });
        });
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <SafeAreaView style={[{ flex: 1 }]}>
        <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              size={"large"}
              color={theme.textColor}
            />
            {/* <Text style={{ color: theme.textColor, fontSize: 16, margin: 10 }}>
              Please wait a bit...
            </Text> */}
          </View>
        </Modal>
        <FlatList
          style={{ flex: 1, backgroundColor: theme.backgroundColor }}
          showsVerticalScrollIndicator={true}
          data={emails.filter(
            (item) =>
              item.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
              item.address.toUpperCase().includes(searchTerm.toUpperCase())
          )}
          onScroll={() => {}}
          // getItem={(data, index) => ({
          //   id: Math.random().toString(12).substring(0),
          //   name: `${data[index].name}`,
          // })}
          // getItemCount={() => emails.length}
          ListHeaderComponent={
            <SearchArea
              emails={emails.filter(
                (item) =>
                  item.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
                  item.address.toUpperCase().includes(searchTerm.toUpperCase())
              )}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              theme={theme}
            />
          }
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          updateCellsBatchingPeriod={20}
          removeClippedSubviews={false}
          windowSize={10}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, id) => (id * Math.random() * 10).toString()}
          renderItem={({ item }) => {
            return (
              <Card
                title={item.name}
                subject={item.subject}
                email={item.address}
              />
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const getEmail = async ({ user, item }) => {
  let ret = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${user.user.email}/messages/${item.id}`,
    {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    }
  );
  let val = await ret.json();
  let email = null;
  val.payload.headers.forEach((e) => {
    let subject = "";
    let name = "";
    let address = "";
    let date = "";
    if (e.name === "From") {
      var head = e.value;
      var str = String(head).split("<");
      name = String(str[0]).trim();
      if (str[1]) address = String(str[1]).substr(0, str[1].length - 1);
      email = { name, address, subject };
    }
    // if ((e.name = "Date")) {
    //   date = e.value;
    //   email = { ...email, date };
    // }
    if (e.name === "Subject") {
      subject = e.value;
      email = { ...email, subject };
    }
    return email;
  });
  return email;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    padding: 5,
    margin: 3,
  },
  search: {
    marginTop: 10,
    margin: 5,
    flexDirection: "row",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default SectionScreen;
