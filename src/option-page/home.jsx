/* eslint-disable react/prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from '@material-ui/lab/Alert';
import AutoSuggest from "./autosuggest";
import Constants from "../../constants";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  div: {
    padding: theme.spacing.unit * 2,
  },
});

class Home extends React.Component {
  state = {
    switchStatus: true,
    ExtStatus: "",
  };
  componentDidMount() {}

  handleSwitch() {}
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.div}>
            <Typography variant="subheading" component="p">
              Change default Country Code here
            </Typography>
            <Typography component="p">
              <FormControlLabel
                control={<AutoSuggest />}
                label={this.state.ExtStatus}
              />
            </Typography>
          </div>
        </Paper>
        <Alert style={{ marginTop: '1rem' }} severity="info">Type country and select your country from auto-suggestion. <a href={Constants.support.howToUseVid}>Watch Tutorial</a></Alert>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
