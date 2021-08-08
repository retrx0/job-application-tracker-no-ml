import React, { useState } from "react";

const NotifyContext = React.createContext();

export const NotifyProvider = ({ children }) => {
  const [appliedBadgeVisible, setAppliedBadgeVisible] = useState(false);
  const [appliedBadgeValue, setAppliedBadgeValue] = useState();
  const [rejectedBadgeVisible, setRejectedBadgeVisible] = useState(false);
  const [rejectedBadgeValue, setRejectedBadgeValue] = useState();
  const [interviewBadgeVisible, setInterviewBadgeVisible] = useState(false);
  const [interviewBadgeValue, setInterviewBadgeValue] = useState();

  const setBadge = (name, visible, value) => {
    switch (name) {
      case "Applied":
        setAppliedBadgeVisible(visible);
        setAppliedBadgeValue(value);
        break;
      case "Rejected":
        setRejectedBadgeVisible(visible);
        setRejectedBadgeValue(value);
        break;
      case "Interview":
        setInterviewBadgeVisible(visible);
        setInterviewBadgeValue(value);
        break;
      default:
        break;
    }
  };

  const getBadge = (name) => {
    switch (name) {
      case "Applied":
        return { visible: appliedBadgeVisible, value: appliedBadgeValue };
      case "Rejected":
        return { visible: rejectedBadgeVisible, value: rejectedBadgeValue };
      case "Interview":
        return { visible: interviewBadgeVisible, value: interviewBadgeValue };
      default:
        break;
    }
  };

  return (
    <NotifyContext.Provider
      value={{
        setBadge,
        getBadge,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};

export default NotifyContext;
