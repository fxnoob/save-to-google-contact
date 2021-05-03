import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as addrs from "extract-data-from-text";
export default class Parser {
  constructor() {}
  async parse(string, opts) {
    return new Promise((resolve, reject) => {
      const obj1 = addrs.emails(string);
      if (obj1.length > 0) {
        resolve({
          type: 1,
          data: obj1[0],
        });
      }
      const obj2 = parsePhoneNumberFromString(string, opts.country.code);
      if (obj2) {
        resolve({
          type: 2,
          data: obj2.number,
        });
      }
      reject("NODATA");
    });
  }
}
