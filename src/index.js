import React from "react";
import ReactDOM from "react-dom/client";
import Content from "./Content";
import "./index.css";

const container = document.createElement("div");
container.setAttribute("id", "translate-extension");
document.querySelector("html").appendChild(container);

const root = ReactDOM.createRoot(
  document.querySelector("#translate-extension")
);
root.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>
);
