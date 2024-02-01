//Import required modules
// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Use ReactDOM to render the root component of the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  //in order not to double-run the code and save orders 2 times
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
