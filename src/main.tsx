import { AuthProvider } from "@/context/AuthContext";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
