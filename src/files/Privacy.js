import React from "react";
import Markdown from "react-native-simple-markdown";

export const PrivacyPolicyText = ({ theme }) => {
  return (
    <Markdown
      styles={{
        heading1: { fontWeight: "700", fontSize: 25, textAlign: "center" },
        heading2: {
          fontWeight: "500",
          fontSize: 20,
          padding: 3,
          textAlign: "center",
        },
        heading3: { fontWeight: "500", fontSize: 16, padding: 3 },
        text: { color: theme.textColor },
        link: { color: theme.colorPrimary },
      }}
    >
      # Privacy Policy {"\n\n"}
      ## 👏 We do not store user emails 👏{"\n\n"}
      All emails are stored on users local storage and not to any of our
      servers, we strongly value user's privacy. you can read more on [**our
      website**](http://www.google.com) {"\n\n"}
      ### Personal data {"\n\n"}
      All Personal info means a lot to us and as a result we will not store any.
      All information gotten is stored on the users device, to confirm this try
      logging out and sign in again.{"\n\n"}
      ### Why we need the data {"\n\n"}
      All information displayed is solely for the user and has nothing to do
      with us. {"\n\n"}
      ### Cookies {"\n\n"}
      We do not store any cookies.{"\n\n"}
      ### How we use data asked {"\n\n"}
      ### Emails [read only] {"\n\n"}
      We need your emails to be able to filter out your applications and update
      to them, although we do not read or see the actual content. we only use
      the subject, sender's emails and the title.{"\n\n"}
      ### Emails Settings [read only] {"\n\n"}
      We need your email settings to be able to get emails from a certian
      period, this is both at first sign in and later sign in to be able to
      fetch new emails related to job applications. {"\n\n"}
    </Markdown>
  );
};
