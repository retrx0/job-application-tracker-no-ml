import { fetchAllEmails } from "../../src/api/GoogleGmailAPI";

test("should return all filtered emails", async () => {
  const allEmails = await fetchAllEmails();
  expect(allEmails).toContain("data");
});
