import React from "react";
import ReactDOM from "react-dom/client";

// components
import { UserProvider } from "./contexts/UserProvider";
import { LanguageProvider } from "./contexts/LanguageProvider";

import { NotificationProvider } from "./contexts/NotificationProvider";

// app
import App from "./App.jsx";

// styles
import "./index.css";
// animations
import "./assets/animations/appear.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </LanguageProvider>
  </React.StrictMode>
);
