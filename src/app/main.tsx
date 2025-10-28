import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRoutes } from "./routes/AppRoutes";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
