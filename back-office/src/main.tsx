import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { setKey, setDefaults, OutputFormat } from "react-geocode";
setDefaults({
  key: import.meta.env.VITE_GOOGLE_KEY,
  outputFormat: OutputFormat.JSON
});
setKey(import.meta.env.VITE_GOOGLE_KEY);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
