import React from "react";
import ReactDOM from "react-dom";
import IFrame from "react-frame-component";
import Index from "./components";

const Element = document.createElement("div");
Element.setAttribute("id", "dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf");
document.body.appendChild(Element);

const Framed = () => (
  <IFrame>
    <Index />
  </IFrame>
);

ReactDOM.render(
  <Framed />,
  document.getElementById("dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf")
);
