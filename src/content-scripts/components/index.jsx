import React from "react";
import Popover from "react-text-selection-popover";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./form";
import Button from "@material-ui/core/Button";
import Loader from "./loader";
import Parser from "../../utils/parser";
import placeRightBelow from "./placeRightBelow";
import "./index.css";
import "../../custom-elements/index";
const parser = new Parser();

export default class Index extends React.Component {
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
    isSaveBtnDisabled: "disabled"
  };
  constructor(props) {
    super(props);
    Index.getText = Index.getText.bind(this);
    this.onTextSelect = this.onTextSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }
  componentDidMount() {}
  static getText() {
    return window.getSelection().toString();
  }
  onTextSelect() {
    chrome.runtime.sendMessage({ method: "ext_status" }, response => {
      if (response.data === true) {
        const selectedText = Index.getText();
        parser
          .parse(selectedText, { country: response.country })
          .then(res => {
            const location = window.location.href;
            const desc = `taken from ${location}`;
            if (res.type === 1) {
              this.setState({
                isOpen: true,
                email: res.data,
                phone: "",
                selectedText: selectedText,
                desc: desc
              });
            } else if (res.type === 2) {
              this.setState({
                isOpen: true,
                phone: res.data,
                email: "",
                selectedText: selectedText,
                desc: desc
              });
            }
          })
          .catch(e => {
            this.setState({ isOpen: false });
          });
      }
    });
  }
  handleClick() {
    this.handleClickOpen();
  }
  handleClickOpen() {
    this.setState({
      isModalOpen: true,
      LoaderName: "loading",
      isLoading: true,
      isSaveBtnDisabled: "disabled"
    });
    setTimeout(() => {
      this.setState({ isLoading: false, isSaveBtnDisabled: "" });
    }, 2500);
  }
  handleClose() {
    this.setState({ isModalOpen: false, isSaveBtnDisabled: "disabled" });
  }
  handleSave() {
    /* handle contact save*/
    this.setState({ isLoading: true, isSaveBtnDisabled: "disabled" });
    chrome.runtime.sendMessage(
      { method: "save_contact", payload: this.state },
      response => {
        if (response.status === "SUCCESS") {
          this.setState({ LoaderName: "done" });
          setTimeout(() => {
            this.setState({ isModalOpen: false, isSaveBtnDisabled: "" });
            setTimeout(() => {
              this.setState({ LoaderName: "loading", isLoading: false });
            }, 1000);
          }, 2000);
        } else if (response.status === "ERROR") {
          this.setState({ LoaderName: "error" });
          setTimeout(() => {
            this.setState({
              LoaderName: "loading",
              isLoading: false,
              isSaveBtnDisabled: ""
            });
          }, 3000);
        }
      }
    );
  }
  onFormChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <Popover
          placementStrategy={placeRightBelow}
          isOpen={this.state.isOpen}
          onTextSelect={this.onTextSelect}
          onTextUnselect={() => this.setState({ isOpen: false })}
        >
          <popover-button onClick={this.handleClick}></popover-button>
        </Popover>
        <Dialog
          style={{ zIndex: 2147483647 }}
          open={this.state.isModalOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
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
        </Dialog>
      </React.Fragment>
    );
  }
}
