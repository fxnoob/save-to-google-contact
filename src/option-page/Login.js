import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import oAuth from "../services/oauth";
import db from "../services/db";
import Constants from "../../constants";
const Message = props => {
  const { message } = props;
  if (message == "") return <Alert severity="info">Login in with gmail account in order to save contact directly from your pc to your phone.</Alert>;
  if (message == "ERROR") {
    return <Alert severity="error">Error Occured! Try Again!</Alert>;
  } else if (message == "SUCCESS") {
    return <Alert severity="success">Logged in successfully! Now close this tab and start using this tool. <a href={Constants.support.howToUseVid}>Watch Tutorial</a></Alert>;
  }
};
export default function Login() {
  const [btnDisabled, setButtonStatus] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Login");
  const [message, setMessage] = useState("");
  const doLogin = async () => {
    setButtonStatus(true);
    try {
      await oAuth.getToken();
      await db.set({ loggedIn: true });
      setBtnLabel("Logged in");
      setMessage("SUCCESS");
    } catch (e) {
      await db.set({ loggedIn: false });
      setButtonStatus(false);
      setMessage("ERROR");
    }
  };
  return (
    <div>
      <Button style={{ marginTop: '1rem', marginBottom: '1rem' }} size="large" variant="contained" color="secondary" onClick={doLogin} disabled={btnDisabled}>
        {btnLabel}
      </Button>
      <br/>
      <Message style={{ marginTop: '1rem', marginBottom: '1rem' }} message={message}/>
    </div>
  );
}
