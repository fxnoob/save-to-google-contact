/* https://developer.chrome.com/apps/tut_oauth*/
class OAuth {
  constructor() {}
  /* get access token from google oauth*/
  getToken() {
    return new Promise((resolve, reject) => {
      try {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          resolve(token);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
const oauth = new OAuth();
export default oauth;
