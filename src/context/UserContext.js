import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState("");

  const setAndSaveUser = (user) => {
    setUser(user);
    if (user !== null) AsyncStorage.setItem("@token", JSON.stringify(user));
  };

  useEffect(() => {
    const set = async () => {
      const token = await AsyncStorage.getItem("@token");
      if (token !== null) {
        setUser(JSON.parse(token));
      }
    };
    set();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, setAndSaveUser, startDate, setStartDate }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
