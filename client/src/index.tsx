// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";

//Jquery
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import "jquery-ui-touch-punch";
import "jquery.transit";

// Polyfills
import "fullscreen-api-polyfill";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "babel-polyfill";

// Import main App component
import App from "./App";
import WebFont from "webfontloader";

// Scripts
import "./scripts/dynamic-title";
import "./scripts/mobile-check";

// Styles
import "./styles.css";

WebFont.load({
  google: {
    families: ["Bangers", "Acme"]
  },
  active: () => {
    // Mount React App
    ReactDOM.render(<App />, document.getElementById("app"));
  }
});
