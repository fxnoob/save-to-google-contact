/* eslint-disable react/prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    color: "#081f43",
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const STGCAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#ffffff", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            STGC
          </Typography>
          <Button color="black">Close</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(STGCAppBar);
