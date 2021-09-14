import React, { createContext, useState, useEffect } from "react";
import {
  getStoredToken,
  getStoredUserInfo,
  storeUserInfo,
} from "../dao/UserDAO";
import { getDateInStringWithSlashes } from "../util/TimeUtil";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const currentDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const [startDate, setStartDate] = useState(
    getDateInStringWithSlashes(currentDate)
  );

  const setAndSaveUser = (user) => {
    setUser(user);
    if (user !== null) storeUserInfo(user);
  };

  useEffect(() => {
    const set = async () => {
      const info = await getStoredUserInfo();
      if (info !== null) setUser(info);
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
