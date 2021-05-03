import "@babel/polyfill";
import db, { schema } from "./services/db";
import Routes from "./routes";
import constants from "../constants";
import chromeService from "./services/chromeService";
class Main {
  constructor() {
    this.init();
  }
  init = async () => {
    this.onInstallListener();
    this.initDb();
    await Routes();
  };
  initDb = async () => {
    const res = await db.get("_loaded");
    if (!res.hasOwnProperty("_loaded")) {
      await db.set({ _loaded: true, ...schema.data });
    }
  };
  onInstallListener = () => {
    chrome.runtime.onInstalled.addListener(() => {
      chromeService.openHelpPage("login");
      this.setFeedbackFormUrl();
    });
  };
  setFeedbackFormUrl = () => {
    chrome.runtime.setUninstallURL(constants.support.googleFormLink);
  };
}
// run
new Main();
