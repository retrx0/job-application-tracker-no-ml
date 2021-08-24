import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import Keys from "../auth/Keys";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const currentDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );
  const [startDate, setStartDate] = useState(
    currentDate.getFullYear() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getDay()
  );

  const setAndSaveUser = (user) => {
    setUser(user);
    if (user !== null) AsyncStorage.setItem(Keys.token, JSON.stringify(user));
  };

  useEffect(() => {
    const set = async () => {
      const token = await AsyncStorage.getItem(Keys.token);
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
