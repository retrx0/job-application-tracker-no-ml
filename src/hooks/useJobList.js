import { useEffect, useState } from "react";
import { getStoredSectionJobs } from "../dao/JobDAO";

export default () => {
  const _t = [];
  const [jobList, setJobList] = useState([
    { sectionName: "Applied", data: [] },
    { sectionName: "Rejected", data: [] },
    { sectionName: "Interview", data: [] },
  ]);

  const set = async () => {
    const data1 = await getStoredSectionJobs("@Applied-emails");
    const data2 = await getStoredSectionJobs("@Rejected-emails");
    const data3 = await getStoredSectionJobs("@Interview-emails");
    return [
      { sectionName: "Applied", data: _t.concat(data1) },
      { sectionName: "Rejected", data: _t.concat(data2) },
      { sectionName: "Interview", data: _t.concat(data3) },
    ];
  };

  const getSectionJobsFromHook = (sectionName) => {
    return jobList.filter((o) => o.sectionName == sectionName)[0].data;
  };

  const setSectionJobsFromHook = (sectionName, list) => {
    jobList.filter((o) => o.sectionName == sectionName)[0].data = list;
  };

  useEffect(() => {
    set().then((result) => setJobList(result));
  }, []);

  return [jobList, setJobList, getSectionJobsFromHook, setSectionJobsFromHook];
};
