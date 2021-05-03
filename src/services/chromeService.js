import { asyncTryCatch, getNamespace } from "./helper";
const chrome = getNamespace();
/**
 * Abstraction class to interact with the chrome extension API
 * @export
 * @class ChromeApi
 */
class ChromeApi {
  constructor() {
    // chrome notification api
    this.notification = chrome.notifications;
  }
  /**
   * Get active tab of the given window
   *
   * @method
   *@param {Number}
   * @memberof ChromeApi
   */
  getActiveTab = winId => {
    const config = { active: true, currentWindow: true };
    if (winId) {
      config.windowId = winId;
    }
    return new Promise(resolve => {
      chrome.tabs.query(config, tabs => {
        resolve(tabs[0]);
      });
    });
  };
  /**
   * try catch get active tab
   *
   * @method
   *@param {Number}
   * @memberof ChromeApi
   */
  tryGetActiveTab = async winId => {
    return asyncTryCatch(this.getActiveTab, winId);
  };

  /**
   *Set Badge on extension icon
   * @method
   * @memberOf ChromeApi
   */
  setBadgeOnActionIcon(badge) {
    chrome.browserAction.setBadgeText({ text: badge });
  }

  /**
   *Set Badge color on extension icon
   * @method
   * @memberOf ChromeApi
   */
  setBadgeColorOnActionIcon(color) {
    chrome.browserAction.setBadgeBackgroundColor({ color });
  }
  /**
   *Open url in new tab
   * @method
   * @param url string
   * @memberOf ChromeApi
   */
  openUrl = url => {
    chrome.tabs.create({ url: url }, () => {});
  };
  /**
   * Open help page
   *
   * @method
   * @memberof ChromeApi
   */
  openHelpPage = (path = "home") => {
    const helpUrl = `${chrome.runtime.getURL("option.html")}?path=${path}`;
    chrome.tabs.create({ url: helpUrl }, () => {});
  };
  /**
   * create context menu
   *
   * @method
   * @memberof ChromeApi
   */
  createContextMenu = opts => {
    return chrome.contextMenus.create(opts);
  };
  /**
   * I18n getMessage
   *
   * @method
   * @memberof ChromeApi
   */
  getI18nMessage(key) {
    return chrome.i18n.getMessage(key);
  }
  /**
   * Check whether script is running on background page or as content script
   *
   * @method
   * @memberof ChromeApi
   */
  getScriptContext() {
    let context = "";
    if (location.protocol == "chrome-extension:") {
      if (location.pathname == "/_generated_background_page.html") {
        context = "background";
      } else {
        context = "content";
      }
    } else {
      context = "content";
    }
    return context;
  }
  /**
   * send message to background page
   * @param path namespace(route) string
   * @param payload data object
   * @param callback function callback
   * @memberOf ChromeApi
   * @method
   * */
  sendMessage(path, payload, callback) {
    const data = payload;
    data.path = path;
    chrome.runtime.sendMessage(data, callback);
  }
  /**
   * commands namespace
   * @class commands
   * @property
   *@memberOf ChromeApi
   * */
  commands = {
    getCommand: commandId => {
      return new Promise(resolve => {
        chrome.commands.getAll((commands) => {
          const content = commands.find(cmd => cmd.name == commandId);
          resolve(content.shortcut);
        });
      });
    }
  }
}
const chromeService = new ChromeApi();
export default chromeService;
