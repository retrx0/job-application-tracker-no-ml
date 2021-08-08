import React from "react";

export const isAndroid = () => Platform.OS === "android";

export const credentials = {
  iosClientId: `575965648407-6rss1rstcgm51q1roa1bhaljjkoni900.apps.googleusercontent.com`,
  androidClientId: `575965648407-v6itn1o9uuo9fqtrkr7tn3j6n6i712en.apps.googleusercontent.com`,
  scopes: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
  ],
};
