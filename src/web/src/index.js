import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@mui/material/CssBaseline';

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; // Use the App
import { RequireAuth, AuthProvider } from "./components/Auth";
import SignIn from "./SignIn";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
