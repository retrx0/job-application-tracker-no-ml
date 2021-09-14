export const getCurrentDateInSeconds = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const getDateInString = (dateInSeconds) => {
  var dt = new Date(0);
  dt.setUTCSeconds(dateInSeconds / 1000);
  return dt.toDateString();
};

export const getDateInStringWithSlashes = (currentDate) => {
  return (
    currentDate.getFullYear() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getDate()
  );
};
