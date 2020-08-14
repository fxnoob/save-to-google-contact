import OAuth from "./utils/oauth";
import Db from "./utils/db";

const oauth = new OAuth();
const db = new Db();

export default class Route {
  constructor() {
    Route.route = Route.route.bind(this);
  }
  init(request, sender, sendResponse) {
    Route.route(request, sender, sendResponse);
    return true;
  }
  static async route(request, sender, sendResponse) {
    if (request.method === "ext_status") {
      try {
        const extStatus = await Route.extStatus();
        const country = await db.get(["country"]);
        sendResponse({
          request: request,
          status: "SUCCESS",
          data: extStatus,
          country: country.country
        });
      } catch (e) {
        sendResponse({ request: request, status: "ERROR", errorData: e });
      }
    } else if (request.method === "save_contact") {
      console.log(request.payload);
      try {
        const data = await Route.saveContact(request.payload);
        sendResponse({ request: request, status: "SUCCESS", data: data });
      } catch (e) {
        sendResponse({ request: request, status: "ERROR", errorData: e });
      }
    }
    return true;
  }
  static async saveContact(payload) {
    const accessToken = await oauth.getToken();
    const url = `https://people.googleapis.com/v1/people:createContact?access_token=${accessToken}`;
    const { firstName, lastName, phone, email, desc } = payload;
    const input = {
      requestBody: {
        emailAddresses: [
          {
            value: email
          }
        ],
        biographies: [
          {
            value: desc
          }
        ],
        phoneNumbers: [
          {
            value: phone
          }
        ],
        names: [
          {
            displayName: `${firstName} ${lastName}`,
            familyName: lastName,
            givenName: firstName
          }
        ]
      }
    };
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input.requestBody)
    });
    const content = await rawResponse.json();
    console.log(content);
  }
  static async extStatus() {
    const { isExtEnabled } = await db.get("isExtEnabled");
    return isExtEnabled;
  }
}
