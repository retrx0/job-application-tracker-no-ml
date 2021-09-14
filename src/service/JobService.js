import { Alert } from "react-native";
import { getStoredSectionJobs, storeSectionJobs } from "../dao/JobDAO";

export const addJob = async (jobItem) => {
  try {
    var data = await getStoredSectionJobs(`@${jobItem.sectionName}-emails`);
    data = [...data, jobItem];
    storeSectionJobs(`@${jobItem.sectionName}-emails`, data);
    console.log("Job added successfully");
  } catch (error) {
    Alert.alert("Couldn't add new job");
    console.error("Error adding job: " + error);
  }
};

export const modifyJob = async (jobItem, newJobItem) => {
  try {
    var data = await getStoredSectionJobs(`@${jobItem.sectionName}-emails`);
    var jobIndex = null;
    data.forEach((item, index) => {
      if (item.date == jobItem.date && item.from == jobItem.from) {
        jobIndex = index;
        return index;
      }
    });

    if (data[jobIndex]) {
      data[jobIndex].from = newJobItem.from;
      data[jobIndex].via = newJobItem.via;
      data[jobIndex].date = newJobItem.date;
      data[jobIndex].sectionName = newJobItem.sectionName;
    }

    storeSectionJobs(`@${jobItem.sectionName}-emails`, data);
    console.log("Job modified successfully");
  } catch (err) {
    Alert.alert("Couldn't edit job");
    console.error("Error modifying job: " + err);
  }
};

export const recategorizeJob = async (jobItem, newCategory) => {
  try {
    //add to new category
    var data = await getStoredSectionJobs(`@${newCategory}-emails`);
    data = [...data, jobItem];
    storeSectionJobs(`@${newCategory}-emails`, data);
    //remove from current category
    await deleteJob(jobItem);
    console.log("Job deleted for recategorization...");
    console.log("Job recategorized successfully");
  } catch (e) {
    Alert.alert("Couldn't recategorize job");
    console.error("Error recategorize job: " + e);
  }
};

export const deleteJob = async (jobItem) => {
  try {
    const data = await getStoredSectionJobs(`@${jobItem.sectionName}-emails`);
    const newData = data.filter(
      (item) => item.date !== jobItem.date && item.from !== jobItem.from
    );
    storeSectionJobs(`@${jobItem.sectionName}-emails`, newData);
    console.log("Job removed successfully");
  } catch (er) {
    Alert.alert("Couldn't delete job");
    console.error("Error delete job: " + er);
  }
};
