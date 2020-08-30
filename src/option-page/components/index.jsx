import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import HeaderComponent from "./header";
import HomeComponent from "./home";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class Index extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <Divider />
        <HomeComponent />
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Index);
