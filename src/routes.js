import messagePassing from "./services/messagePassing";
import contactService from "./services/contactService";
const Routes = () => {
  // save requested contact.
  messagePassing.on("/save", async (req, res) => {
    const { firstName, lastName, phone, email, desc } = req;
    try {
      await contactService.save({ firstName, lastName, phone, email, desc });
      res({ status: "SUCCESS" });
    } catch (e) {
      res({ status: "ERROR" });
    }
  });
};
export default Routes;
