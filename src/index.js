// global import for css styles
import "./index.css"; 

// react imports
import React from "react";
import ReactDOM from "react-dom/client";

// main component imports
import { App } from "./App";
import { CartLogic } from "./CartContextLogic";
import { PageLogic } from "./PageContextLogic";

// initialize the root element for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// render the application within React's StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <PageLogic>
      <CartLogic>
        <App/>
      </CartLogic>
    </PageLogic>
  </React.StrictMode>
);
