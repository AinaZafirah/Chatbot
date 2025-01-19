import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChatContextProvider } from "./View/ChatContext";
import { AuthContextProvider } from "./context/authContext";

import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <GoogleOAuthProvider clientId="66940580705-pktjqqj9942gbqep34hul8g0akrtmql1.apps.googleusercontent.com">
  //     <App />
  //   </GoogleOAuthProvider>
  // </React.StrictMode>

  <AuthContextProvider>
    <ChatContextProvider>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ChatContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
