import React from "react";
import Popover from "react-text-selection-popover";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IFrameComponent from "./FrameMUI";
import "./index.css";
import Form from "./form";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcCallRoundedIcon from "@material-ui/icons/AddIcCallRounded";
import Loader from "./loader";
import Parser from "../services/parser";
import placeRightBelow from "./placeRightBelow";
import initialContent from "./initialIframeContent";
import messagePassing from "../services/messagePassing";
import db from "../services/db";

const parser = new Parser();

export default class App extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    isOpen: false,
    isModalOpen: false,
    selectedText: "",
    hasMissing: false,
    value: 1,
    hasErrors: false,
    isLoading: true,
    mobileNo: "",
    email: "",
    phone: "",
    desc: "",
    LoaderName: "loading",
    isSaveBtnDisabled: "disabled",
  };
  constructor(props) {
    super(props);
  }
  getText = () => {
    return window.getSelection().toString();
  };
  onTextSelect = async () => {
    const { isExtEnabled, country } = await db.get("isExtEnabled", "country");
    if (isExtEnabled) {
      try {
        const selectedText = this.getText();
        const location = window.location.href;
        const desc = `taken from ${location}`;
        const parsed = await parser.parse(selectedText, { country });
        const email = parsed.type === 1 ? parsed.data : "";
        const phone = parsed.type === 2 ? parsed.data : "";
        this.setState({
          isOpen: true,
          phone: phone,
          email: email,
          selectedText: selectedText,
          desc: desc,
        });
      } catch (e) {
        this.setState({ isOpen: false });
      }
    }
  };
  handleClick = () => {
    this.handleClickOpen();
  };
  handleClickOpen = () => {
    this.setState({
      isModalOpen: true,
      LoaderName: "loading",
      isLoading: true,
      isSaveBtnDisabled: "disabled",
    });
    setTimeout(() => {
      this.setState({ isLoading: false, isSaveBtnDisabled: "" });
    }, 2500);
  };
  handleClose = () => {
    this.setState({ isModalOpen: false, isSaveBtnDisabled: "disabled" });
  };
  handleSave = () => {
    this.setState({ isLoading: true, isSaveBtnDisabled: "disabled" });
    messagePassing.sendMessage("/save", { ...this.state }, async (res) => {
      if (res.status == "SUCCESS") {
        this.setState({ LoaderName: "done" });
        setTimeout(() => {
          this.setState({ isModalOpen: false, isSaveBtnDisabled: "" });
          setTimeout(() => {
            this.setState({ LoaderName: "loading", isLoading: false });
          }, 1000);
        }, 2000);
      } else if (res.status == "ERROR") {
        this.setState({ LoaderName: "error" });
        setTimeout(() => {
          this.setState({
            LoaderName: "loading",
            isLoading: false,
            isSaveBtnDisabled: "",
          });
        }, 3000);
      }
    });
  };
  onFormChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Popover
          placementStrategy={placeRightBelow}
          isOpen={this.state.isOpen}
          onTextSelect={this.onTextSelect}
          onTextUnselect={() => this.setState({ isOpen: false })}
        >
          <IFrameComponent
            initialContent={initialContent()}
            className="default-iframe"
            style={{ border: "none", height: "50px", width: "50px" }}
          >
            <IconButton
              style={{ background: "#f1f2fa", border: "1px solid black" }}
              onClick={this.handleClick}
              color="primary"
              aria-label="Add contact"
              component="span"
            >
              <AddIcCallRoundedIcon />
            </IconButton>
          </IFrameComponent>
        </Popover>
        <Dialog
          style={{ zIndex: 2147483647 }}
          open={this.state.isModalOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IFrameComponent
            initialContent={initialContent()}
            className=""
            style={{ width: "480px", height: "410px", border: "none" }}
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ textAlign: "center" }}
            >
              {"Google Contact Book"}
            </DialogTitle>
            <DialogContent>
              {this.state.isLoading ? (
                <Loader for={this.state.LoaderName} />
              ) : (
                <Form
                  firstname={this.state.firstName}
                  lastname={this.state.lastName}
                  phone={this.state.phone}
                  email={this.state.email}
                  desc={this.state.desc}
                  onChange={this.onFormChange}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                id="saveButton"
                disabled={this.state.isSaveBtnDisabled}
                onClick={this.handleSave}
                color="primary"
              >
                Save
              </Button>
              <Button
                id="cancelButton"
                onClick={this.handleClose}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </IFrameComponent>
        </Dialog>
      </div>
    );
  }
}
