import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToasterContainer } from "./components/Toaster/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <GlobalContextProvider>
          <ToasterContainer />
          <App />
        </GlobalContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
