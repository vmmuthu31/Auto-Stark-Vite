// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
const connectors = [new InjectedConnector({ options: { id: "argentX" } })];
ReactDOM.createRoot(document.getElementById("root")).render(
  <StarknetConfig connectors={connectors}>
    <App />
  </StarknetConfig>
);
