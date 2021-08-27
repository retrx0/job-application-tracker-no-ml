import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  VirtualizedList,
} from "react-native";
import Card from "../components/card/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import NotifyContext from "../context/NotifyContext";
import SearchArea from "../components/SearchArea";
import Keys from "../auth/Keys";
import {
  getSectionJobs,
  getTimeStamp,
  storeSectionJobs,
  storeTimeStamp,
} from "../dao/JobDAO";
import JobCardsContext from "../context/JobCardsContext";
import { testData } from "../../test/data/TestData";
import ActivityModal from "../components/modal/ActivityModal";
import {
  fetchAllEmails,
  getAllJobs,
  getRefreshToken,
} from "../api/GoogleGmailAPI";
import useJobEmails from "../hooks/useJobList";

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

  const [jobList, setJobList, setSectionJobsFromHook, getSectionJobsFromHook] =
    useJobEmails();

  const resolveModalAndSetDataWithBadge = (data, tmp_eml) => {
    console.log("Resolving and setting badge");
    if (data[0].length > 0) {
      console.log("New jobs found");
      setBadge(sectionName, true, data[0].length);
      setEmails((e) => data[0].concat(e));
      //setModalVisible((p) => !p);
      storeSectionJobs(`@${sectionName}-emails`, data[0].concat(tmp_eml));
      console.log("Saved new email data, badge set to : " + data[0].length);
    }
  };

  const addToJobList = (item) => {
    if (
      !jobList.filter((obj) => obj.sectionName == item.sectionName).length > 0
    )
      setJobList((l) => [...l, item]);
  };

  useEffect(() => {
    //AsyncStorage.clear();
    console.log("Selected start date from section screen: " + startDate);

    //Check if emails are stored
    console.log("Checking if email data is stored");
    getSectionJobs(`@${sectionName}-emails`).then((res) => {
      if (res !== null) {
        console.log("Saved emails found, Fetching new emails");
        setEmails(res);
        getTimeStamp(sectionName).then((time) => {
          if (time !== null) {
            console.log("Previous saved login time: " + time); //1614819682
            getAllJobs(
              user,
              `after:${time}`,
              mustContain,
              has,
              sectionName
            ).then((_data) => {
              console.log("New data: " + _data.length);
              if (_data[1].error !== undefined) {
                console.log("Could not get new emails. Requesting new token");
                getRefreshToken(user)
                  .then((__data) => {
                    if (__data.error === undefined) {
                      user.accessToken = __data.access_token;
                      setUser(user);
                      AsyncStorage.setItem(Keys.token, JSON.stringify(user));
                      getAllJobs(
                        user,
                        `after:${time}`,
                        mustContain,
                        has,
                        sectionName
                      ).then((__eml) => {
                        resolveModalAndSetDataWithBadge(__eml, res);
                      });
                    }
                  })
                  .catch((e) => console.log("Error requesting new token " + e));
              } else {
                resolveModalAndSetDataWithBadge(_data, res);
              }
            });
          }
        });
        storeTimeStamp(sectionName);
      } else {
        console.log("No Saved Emails Found, Fetching new set of emails");
        // Store Emails
        getAllJobs(
          user,
          `after:${startDate}`,
          mustContain,
          has,
          sectionName
        ).then((_data_) => {
          console.log("Result size estimate: " + _data_[1].resultSizeEstimate);
          setEmails(_data_[0]);
          storeSectionJobs(`@${sectionName}-emails`, _data_[0]);
          //setModalVisible((p) => !p);
          storeTimeStamp(sectionName);
          // addToJobList({
          //   sectionName: sectionName,
          //   data: _data_[0],
          // });
          console.log("Successfully saved emails");
        });
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <SafeAreaView style={[{ flex: 1 }]}>
        {/* <ActivityModal theme={theme} modalVisible={false} /> */}
        <FlatList
          style={{ flex: 1, backgroundColor: theme.backgroundColor }}
          showsVerticalScrollIndicator={true}
          data={emails.filter(
            (item) =>
              item.from.toUpperCase().includes(searchTerm.toUpperCase()) ||
              item.address.toUpperCase().includes(searchTerm.toUpperCase())
          )}
          onScroll={() => {}}
          ListHeaderComponent={
            <SearchArea
              emails={emails.filter(
                (item) =>
                  item.from.toUpperCase().includes(searchTerm.toUpperCase()) ||
                  item.address.toUpperCase().includes(searchTerm.toUpperCase())
              )}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              theme={theme}
              callBack={setEmails}
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
                jobItem={{ ...item, sectionName }}
                callBack={setEmails}
                from={item.from}
                via={item.via}
                date={item.date}
                address={item.address}
                section={sectionName}
              />
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default SectionScreen;
