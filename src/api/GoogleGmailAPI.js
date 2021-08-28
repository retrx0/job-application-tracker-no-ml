import { URLS } from "../constants/URL_CONSTANTS";
import { credentials } from "../auth/Credentials";
import { Platform } from "react-native";

export const isAndroid = () => Platform.OS === "android";

export const fetchAllEmails = async (user, constraint, mustContain, has) => {
  // Fetch All Emails
  const data = await fetch(
    `${URLS.FETCH_EMAILS_URL}/${user.user.email}/messages?q=(${mustContain} ${has} ${constraint})`,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((e) => {
      console.log("Problem Fetching All Emails: " + e);
    });

  return data;
};

export const getAllJobs = async (
  user,
  constraint,
  mustContain,
  has,
  sectionName
) => {
  const data = await fetchAllEmails(user, constraint, mustContain, has);
  let tmp = [];
  if (data.resultSizeEstimate > 0) {
    for (const i in data.messages) {
      const item = data.messages[i];
      const e = await getEmail({ user, item }, sectionName);
      tmp.push(e);
    }
    return [tmp, data];
  } else return [tmp, data];
};

export const getEmail = async ({ user, item }, sectionName) => {
  let ret = await fetch(
    `${URLS.GET_EMAIL_URL}/${user.user.email}/messages/${item.id}`,
    {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    }
  );
  let val = await ret.json();
  let email = { from: "", address: "", date: "", subject: "", via: "" };
  val.payload.headers.forEach((e) => {
    let subject = "";
    let from = "";
    let address = "";
    let date = "";
    if (e.name === "From") {
      var head = e.value;
      var str = String(head).split("<");
      from = String(str[0]).trim();
      if (str[1]) address = String(str[1]).substr(0, str[1].length - 1);
      email = {
        from,
        address,
        subject,
        via: address ? String(address).split("@")[1].trim() : "",
        sectionName,
      };
    }

    if (e.name === "Subject") {
      subject = e.value;
      email = { ...email, subject };
    }
    return email;
  });

  if (email.from === "LinkedIn")
    email.from = String(email.subject).split(RegExp(" at "))[1].trim();
  return { ...email, date: val.internalDate };
};

export const getRefreshToken = async (user) => {
  const refresh_token = await fetch(
    `${URLS.REFRESH_TOKEN_URL}?client_id=${
      isAndroid() ? credentials.androidClientId : credentials.iosClientId
    }&refresh_token=${user.refreshToken}&grant_type=refresh_token`,
    {
      method: "POST",
    }
  ).then((res) => res.json());
  return refresh_token;
};
