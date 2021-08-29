import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { SafeAreaView } from "react-native";
import ThemeContext from "../../context/ThemeContext";
import SectionScreen from "../../screens/SectionScreen";
import Tab from "../Tab";

const TopTab = createMaterialTopTabNavigator();

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

export default TopTabs;
