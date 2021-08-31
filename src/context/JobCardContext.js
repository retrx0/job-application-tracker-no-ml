import React, { createContext, useEffect, useState, useReducer } from "react";
import {
  testDataWithSection,
  testEmptyDataWithSection,
} from "../../test/data/StaticTestData";
import { storeSectionJobs } from "../dao/JobDAO";
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
    storeSectionJobs(Keys.jobs, [...jobCardList]);
  };

  const editJob = (item, newItem) => {
    dispatch({
      type: "edit",
      payload: { item: item, newItem: newItem },
    });
    storeSectionJobs(Keys.jobs, [...jobCardList]);
  };

  const deleteJob = (item) => {
    dispatch({
      type: "delete",
      payload: item,
    });
    storeSectionJobs(Keys.jobs, [...jobCardList]);
  };

  const recategorizeJob = (item, newCat) => {
    dispatch({
      type: "recategorize",
      payload: { ...item, newCategory: newCat },
    });
    storeSectionJobs(Keys.jobs, [...jobCardList]);
  };

  const setJobs = (data) => {
    dispatch({ type: "set", payload: data });
  };

  const addSectionJobs = (object) => {
    dispatch({ type: "addSection", payload: object });
    storeSectionJobs(Keys.jobs, [...jobCardList]);
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
