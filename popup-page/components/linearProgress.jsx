import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  root: {
    flexGrow: 1
  }
};

const LinearQuery = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
    </div>
  );
};

export default withStyles(styles)(LinearQuery);
