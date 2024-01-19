import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import { RecoilRoot } from "recoil";

axios.defaults.withCredentials = true;

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </RecoilRoot>
);
