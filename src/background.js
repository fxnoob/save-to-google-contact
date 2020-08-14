import "@babel/polyfill";
import Db, { Schema } from "./utils/db";
import Routes from "./routes";

const routes = new Routes();
const db = new Db();

/*  init factory settings*/
db.get(["isLoadedFirstTime"]).then(async res => {
  if (!res.hasOwnProperty("isLoadedFirstTime")) {
    const schema = new Schema();
    await db.set({ isLoadedFirstTime: true, ...schema.data });
  }
});

/* set background message listener for content script signals*/
chrome.runtime.onMessage.addListener(routes.init);
