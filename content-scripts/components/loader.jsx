import React from "react";
import Lottie from "lottie-react-web";
import loader from "./loaderJson";
import Done from "./done";
import ConnectionErrorLoad from "./connection-error";

export default class Loader extends React.Component {
  render() {
    let loaderJson = loader;
    const { for: For } = this.props;
    if (For === "loading") {
      loaderJson = loader;
    } else if (For === "error") {
      loaderJson = ConnectionErrorLoad;
    } else if (For === "done") {
      loaderJson = Done;
    }
    return (
      <div style={{ width: "300px" }}>
        <Lottie
          style={{ width: "300px" }}
          options={{
            animationData: loaderJson
          }}
        />
      </div>
    );
  }
}
