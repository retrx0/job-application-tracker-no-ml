export const getCompanyNameFromEmailSubject = (email) => {
  if (email) {
    if (email.from && email.subject) {
      if (email.from === "LinkedIn") {
        if (String(email.subject).includes(" at ")) {
          const tmp = String(email.subject).split(RegExp(" at "))[1].trim();
          if (tmp) return tmp;
          else return email.from;
        }
      }
    }
  }
  return email.from;
};

export const trimAndRemoveUnnecessaryCharFromEmailSender = (jobItem) => {
  if (String(jobItem.from).startsWith('"')) {
    let rgx = new RegExp(`"`, "g");
    jobItem.from = String(jobItem.from).replace(rgx, "");
  }

  if (
    String(jobItem.from).startsWith("no-reply") ||
    String(jobItem.from).startsWith("noreply") ||
    String(jobItem.from).startsWith("jobs")
  )
    jobItem.from = String(jobItem.from).split("@")[1].trim();
};

export const capitalizeFirstLetter = (string) => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};
