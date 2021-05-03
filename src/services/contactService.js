import oAuth from "./oauth";

class Contact {
  save = async ({ firstName, lastName, phone, email, desc }) => {
    const accessToken = await oAuth.getToken();
    const url = `https://people.googleapis.com/v1/people:createContact?access_token=${accessToken}`;
    const input = {
      requestBody: {
        emailAddresses: [
          {
            value: email,
          },
        ],
        biographies: [
          {
            value: desc,
          },
        ],
        phoneNumbers: [
          {
            value: phone,
          },
        ],
        names: [
          {
            displayName: `${firstName} ${lastName}`,
            familyName: lastName,
            givenName: firstName,
          },
        ],
      },
    };
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input.requestBody),
    });
    return await rawResponse.json();
  };
}
const contactService = new Contact();
export default contactService;
