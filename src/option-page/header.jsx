/* eslint-disable react/prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const styles = {
  root: {
    padding: '0px',
    margin: '0px',
  },
  grow: {
    color: "#081f43",
  },
};
const STGCAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#ffffff", boxShadow: "none", padding: '0px' }}
      >
        <Toolbar style={{ padding: '0px' }}>
          <Typography variant="h6" className={classes.grow}>
            Save to Google Contacts
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(STGCAppBar);
