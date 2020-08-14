import React from "react";
import { Divider } from "@material-ui/core";

export default class HowTo extends React.Component {
  render() {
    return (
      <div>
        <a
          style={{ whiteSpace: "nowrap", fontSize: "11px" }}
          target="_blank"
          href="https://support.google.com/contacts/answer/2753077?co=GENIE.Platform%3DiOS&hl=en"
        >
          How to see Google Contacts on my mobile device or computer?
        </a>
        <Divider />
      </div>
    );
  }
}
