/* eslint-disable react/prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import HomeComponent from "./home";
import HelpComponent from "./howto";
import FooterComponent from "./footer";

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: 8 * 3, textAlign: "center" }}
    >
      {children}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 350,
  },
  tabContainer: {
    textAlign: "center",
  },
});

class App extends React.Component {
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.gotoHelpTab = this.gotoHelpTab.bind(this);
  }
  componentDidMount() {}
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };
  gotoHelpTab() {
    const value = 1;
    this.setState({ value: value });
  }
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<HomeIcon />} />
            <Tab icon={<HelpIcon />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction} className={classes.tabContainer}>
            {/* include home component*/}
            <HomeComponent gotoHelpTab={this.gotoHelpTab} />
          </TabContainer>
          <TabContainer dir={theme.direction} className={classes.tabContainer}>
            {/* include help component*/}
            <HelpComponent />
          </TabContainer>
        </SwipeableViews>
        {/* include footer component*/}
        <FooterComponent />
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(App);
