import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, FlatList, VirtualizedList } from "react-native";
import Card from "../components/card/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import ThemeContext from "../context/ThemeContext";
import UserContext from "../context/UserContext";
import NotifyContext from "../context/NotifyContext";
import SearchArea from "../components/SearchArea";
import Keys from "../auth/Keys";
import {
  getStoredSectionJobs,
  getStoredTimeStamp,
  storeSectionJobs,
  storeTimeStamp,
} from "../dao/JobDAO";
import JobCardContext from "../context/JobCardContext";
import ActivityModal from "../components/modal/ActivityModal";
import { getAllJobs, getRefreshToken } from "../api/GoogleGmailAPI";
import useJobEmails from "../hooks/useJobList";

const SectionScreen = ({ navigation, route }) => {
  const { user, setUser, startDate } = useContext(UserContext);
  const sectionName = route.params.params.name;
  const mustContain = route.params.params.mustContain;
  const has = route.params.params.has;
  const [modalVisible, setModalVisible] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { setBadge, getBadge } = useContext(NotifyContext);
  const { jobCardList, addSectionJobs, setJobs } = useContext(JobCardContext);
  const jobs = jobCardList.filter((i) => i.sectionName == sectionName)[0].data;

  const tmp_userDTO = {
    user: user,
    mustContain: mustContain,
    has: has,
    sectionName: sectionName,
  };

  const resolveModalAndSetDataWithBadge = (data, tmp_eml) => {
    console.log("Resolving and setting badge");
    if (data[0].length > 0) {
      console.log("New jobs found");
      setBadge(sectionName, true, data[0].length);
      setJobs((e) => data[0].concat(e));
      //setModalVisible((p) => !p);
      storeSectionJobs(Keys.jobs, data[0].concat(tmp_eml));
      console.log("Saved new email data, badge set to : " + data[0].length);
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    console.log("Selected start date from section screen: " + startDate);

    //Check if emails are stored
    console.log("Checking if email data is stored");
    getStoredSectionJobs(Keys.jobs).then((res) => {
      if (res !== null) {
        console.log("Saved emails found, Fetching new emails");
        setJobs(res);
        getStoredTimeStamp(sectionName).then((time) => {
          if (time !== null) {
            console.log("Previous saved login time: " + time); //1614819682
            getAllJobs({ ...tmp_userDTO, constraint: `after:${time}` }).then(
              (_data) => {
                console.log("New data: " + _data[0].length);
                if (_data[1].error !== undefined) {
                  console.log("Could not get new emails");
                  getRefreshToken(user)
                    .then((__data) => {
                      if (__data.error === undefined) {
                        user.accessToken = __data.access_token;
                        setUser(user);
                        AsyncStorage.setItem(Keys.token, JSON.stringify(user));
                        getAllJobs({
                          ...tmp_userDTO,
                          constraint: `after:${time}`,
                        }).then((__eml) => {
                          resolveModalAndSetDataWithBadge(__eml, res);
                        });
                      }
                    })
                    .catch((e) =>
                      console.log("Error requesting new token " + e)
                    );
                } else {
                  resolveModalAndSetDataWithBadge(_data, res);
                }
              }
            );
          }
        });
        storeTimeStamp(sectionName);
      } else {
        console.log("No Saved Emails Found, Fetching new set of emails");
        // Store Emails
        getAllJobs({ ...tmp_userDTO, constraint: `after:${startDate}` }).then(
          (_data_) => {
            console.log(
              "Result size estimate: " + _data_[1].resultSizeEstimate
            );
            //setModalVisible((p) => !p);
            storeTimeStamp(sectionName);
            addSectionJobs({
              sectionName: sectionName,
              data: _data_[0],
            });
            console.log("Successfully saved emails");
          }
        );
      }
    });
  }, []);

  const renderCard = ({ item }) => {
    return <Card jobItem={{ ...item, sectionName }} />;
  };

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <SafeAreaView style={[{ flex: 1 }]}>
        {/* <ActivityModal theme={theme} modalVisible={false} /> */}
        <FlatList
          style={{ flex: 1, backgroundColor: theme.backgroundColor }}
          showsVerticalScrollIndicator={true}
          data={jobs.filter(
            (item) =>
              item.from.toUpperCase().includes(searchTerm.toUpperCase()) ||
              item.address.toUpperCase().includes(searchTerm.toUpperCase())
          )}
          onScroll={() => {}}
          ListHeaderComponent={
            <SearchArea
              emails={jobs.filter(
                (item) =>
                  item.from.toUpperCase().includes(searchTerm.toUpperCase()) ||
                  item.address.toUpperCase().includes(searchTerm.toUpperCase())
              )}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              theme={theme}
            />
          }
          maxToRenderPerBatch={20}
          initialNumToRender={15}
          updateCellsBatchingPeriod={20}
          removeClippedSubviews={false}
          windowSize={10}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, id) => (id * Math.random() * 10).toString()}
          renderItem={renderCard}
        />
      </SafeAreaView>
    </View>
  );
};

export default SectionScreen;
