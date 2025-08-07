  // import React from "react";
  // import ReactDOM from "react-dom/client";
  // import { BrowserRouter } from "react-router-dom";
  // import App from "./App.jsx";

  // ReactDOM.createRoot(document.getElementById("root")).render(
  //   <React.StrictMode>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </React.StrictMode>
  // );


  // 🔌 React core imports
import React from "react";
import ReactDOM from "react-dom/client";

// 🌐 Routing setup
import { BrowserRouter } from "react-router-dom";

// 🧩 Root component
import App from "./App.jsx";

// 🎨 Global styles (Tailwind + custom CSS)
import "./index.css";

// 🚀 Mount the app to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

