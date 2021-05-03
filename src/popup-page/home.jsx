/* eslint-disable react/prop-types */
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "./linearProgress";
import db from "../services/db";
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Home extends React.Component {
  state = {
    isLoading: true,
    switchStatus: true,
    ExtStatus: "Disabled",
  };
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  navigateToOptionPage() {
    chrome.tabs.create({ url: "/option.html" });
  }
  componentDidMount() {
    db.get("isExtEnabled")
      .then((res) => {
        if (res.isExtEnabled === true) {
          this.setState({ ExtStatus: "Enabled", switchStatus: true });
        } else {
          this.setState({ ExtStatus: "Disabled", switchStatus: false });
        }
        this.setState({ isLoading: false });
      })
      .catch(() => {});
  }
  handleSwitch() {
    db.set({ isExtEnabled: !this.state.switchStatus });
    const oppo = !this.state.switchStatus;
    const ExtStatus = oppo ? "Enabled" : "Disabled";
    this.setState({ switchStatus: oppo, ExtStatus: ExtStatus });
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <LinearProgress />
        ) : (
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.switchStatus}
                  onChange={() => {
                    this.handleSwitch();
                  }}
                />
              }
              label={this.state.ExtStatus}
            />
            <br />
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={this.navigateToOptionPage}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Settings
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
