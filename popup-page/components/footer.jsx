import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  footer: {
    textAlign: "center"
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footer}>
        Creator @
        <a href="https://github.com/fxnoob/" target="_blank">
          fxnoob
        </a>{" "}
        made with ♥ and this{" "}
        <a
          href="https://github.com/fxnoob/chrome-extension-boilerplate"
          target="_blank"
        >
          chrome extension boilerplate
        </a>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Footer);
