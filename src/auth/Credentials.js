import React from "react";

export const isAndroid = () => Platform.OS === "android";

export const credentials = {
  iosClientId: `575965648407-g65mep1gpvofbe4vglgaojdha28svkie.apps.googleusercontent.com`,
  androidClientId: `575965648407-vftkh3lpkfpdmrkuur7q2fagfioncjq5.apps.googleusercontent.com`,
  scopes: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/gmail.readonly",
  ],
};
