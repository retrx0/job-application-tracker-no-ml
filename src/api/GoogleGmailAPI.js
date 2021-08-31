import { URLS } from "../constants/URL_CONSTANTS";
import { credentials } from "../auth/Credentials";
import { Platform } from "react-native";
import { getCompanyNameFromEmailSubject } from "../util/StringUtil";

export const isAndroid = () => Platform.OS === "android";

export const fetchAllEmails = async (dto) => {
  // Fetch All Emails
  const data = await fetch(
    `${URLS.FETCH_EMAILS_URL}/${dto.user.user.email}/messages?q=(${dto.mustContain} ${dto.has} ${dto.constraint})`,
    {
      headers: {
        Authorization: `Bearer ${dto.user.accessToken}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((e) => {
      console.log("Problem Fetching All Emails: " + e);
    });

  return data;
};

export const getAllJobs = async (dto) => {
  console.log("Getting all jobs...");
  const data = await fetchAllEmails(dto);
  let tmp = [];
  if (data.resultSizeEstimate > 0) {
    for (const i in data.messages) {
      const item = data.messages[i];
      const e = await getEmail({ user: dto.user, item }, dto.sectionName);
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

  email.from = getCompanyNameFromEmailSubject(email);

  return { ...email, date: val.internalDate, id: val.id };
};

export const getRefreshToken = async (user) => {
  console.log("Requesting new token");
  try {
    const refresh_token = await fetch(
      `${URLS.REFRESH_TOKEN_URL}?client_id=${
        isAndroid() ? credentials.androidClientId : credentials.iosClientId
      }&refresh_token=${user.refreshToken}&grant_type=refresh_token`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    return refresh_token;
  } catch (e) {
    console.error(`Problem getting refresh token: ` + e);
  }
};
