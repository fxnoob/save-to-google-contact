import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import PrivateRoute from "../components/PrivateRoute";
const Header = React.lazy(() => import("./header"));
const Login = React.lazy(() => import("./Login"));
const Home = React.lazy(() => import("./home"));
const queryString = require("query-string");
const parsed = queryString.parse(location.search);
const path = decodeURIComponent(parsed.path ? parsed.path : "home");
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});
const GetView = ({ path }) => {
  let view;
  switch (path) {
  case "home":
    view = <PrivateRoute component={Home} permissionComponent={Login} />;
    break;
  case "login":
    view = <Login />;
    break;
  default:
    view =
        <PrivateRoute component={Home} permissionComponent={Login} />
    ;
  }
  return view;
};
class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={<div style={{ textAlign: "center" }}>Loading...</div>}
      >
        <Container>
          <Header />
          <Divider />
          <GetView path={path} />
        </Container>
      </Suspense>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
