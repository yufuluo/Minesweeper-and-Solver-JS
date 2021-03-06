require("babel-register")();

var React = require("react");
var ReactDOM = require("react-dom");

var jsdom = require("jsdom").jsdom;

var exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("");
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};

global.React = React;
global.ReactDOM = ReactDOM;

documentRef = document;
