import React from "react";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Constants from "../../constants";

export default function HowTo() {
  const OpenTut = () => {
    chrome.tabs.create({ url: Constants.support.howToUseVid });
  };
  return (
    <div>
      <a
        style={{ whiteSpace: "nowrap", fontSize: "11px" }}
        target="_blank"
        href="https://support.google.com/contacts/answer/2753077?co=GENIE.Platform%3DiOS&hl=en"
        rel="noreferrer"
      >
        How to see Google Contacts on my mobile device or computer?
      </a>
      <Divider />
      <Button style={{ marginTop: "1rem" }} onClick={OpenTut}>
        Watch Tutorial
      </Button>
    </div>
  );
}
