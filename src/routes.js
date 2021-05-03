import db from "./services/db";
import messagePassing from "./services/messagePassing";
import contactService from "./services/contactService";
const Routes = () => {
  // check extension is enabled or disabled.
  messagePassing.on("/ext_status", async (req, res) => {
    const { country, isExtEnabled } = await db.get("country", "isExtEnabled");
    res({ country, isExtEnabled });
  });
  // save requested contact.
  messagePassing.on("/save", async (req, res) => {
    const { firstName, lastName, phone, email, desc } = req;
    try {
      await contactService.save({ firstName, lastName, phone, email, desc });
      res({ status: "SUCCESS" });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
      res({ status: "ERROR" });
    }
  });
};
export default Routes;
