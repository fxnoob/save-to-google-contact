import "@babel/polyfill";
import db, { schema } from "./services/db";
import Routes from "./routes";
class Main {
  constructor() {
    this.init();
  }
  init = async () => {
    this.initDb();
    await Routes();
  };
  initDb = async () => {
    const res = await db.get("_loaded");
    if (!res.hasOwnProperty("_loaded")) {
      await db.set({ _loaded: true, ...schema.data });
    }
  };
}
// run
new Main();
