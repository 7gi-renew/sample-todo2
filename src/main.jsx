import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import firebase from "./utils/Firebase";

if (import.meta.env.VITE_FIREBASE_NODE_ENV === "production") {
  firebase.analytics();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
