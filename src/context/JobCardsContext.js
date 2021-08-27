import React, { createContext, useEffect, useState } from "react";
import { getSectionJobs, storeSectionJobs } from "../dao/JobDAO";

const JobCardsContext = createContext();

export const JobCardsProvider = ({ children }) => {
  const [jobCardList, setJobCardList] = useState([]);

  useEffect(() => {
    const get = async () => {
      const result = await getSectionJobs(`jobs-dto`);
      result !== null ? setJobCardList(result) : setJobCardList([]);
    };
    get();
  }, []);

  return (
    <JobCardsContext.Provider
      value={{
        jobCardList,
        setJobCardList,
      }}
    >
      {children}
    </JobCardsContext.Provider>
  );
};

export default JobCardsContext;
