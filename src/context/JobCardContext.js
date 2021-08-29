import React, { createContext, useEffect, useState, useReducer } from "react";
import {
  testDataWithSection,
  testEmptyDataWithSection,
} from "../../test/data/StaticTestData";
import jobCardReducer from "../reducers/jobCardReducer";

const JobCardContext = createContext();

export const JobCardProvider = ({ children }) => {
  const [jobCardList, dispatch] = useReducer(
    jobCardReducer,
    testEmptyDataWithSection
  );

  const addJob = (object) => {
    dispatch({
      type: "add",
      payload: object,
    });
  };

  const editJob = (item, newItem) => {
    dispatch({
      type: "edit",
      payload: { item: item, newItem: newItem },
    });
  };

  const deleteJob = (item) => {
    dispatch({
      type: "delete",
      payload: item,
    });
  };

  const recategorizeJob = (item, newCat) => {
    dispatch({
      type: "recategorize",
      payload: { ...item, newCategory: newCat },
    });
  };

  const setJobs = (data) => {
    dispatch({ type: "set", payload: data });
  };

  const addSectionJobs = (object) => {
    dispatch({ type: "addSection", payload: object });
  };

  useEffect(() => {
    return () => {
      setJobs([]);
    };
  }, []);

  return (
    <JobCardContext.Provider
      value={{
        jobCardList,
        addJob,
        deleteJob,
        editJob,
        recategorizeJob,
        setJobs,
        addSectionJobs,
      }}
    >
      {children}
    </JobCardContext.Provider>
  );
};

export default JobCardContext;
