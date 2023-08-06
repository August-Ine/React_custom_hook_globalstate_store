import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import configureProductStore from "./hooks-store/products-store";
// import productReducer from './store/reducers/products';

// const rootReducer = combineReducers({
//   shop: productReducer
// });

// const store = createStore(rootReducer);
configureProductStore(); // initialise product store

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
