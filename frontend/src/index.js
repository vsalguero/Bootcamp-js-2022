import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import store from "./store";


const container = document.getElementById("root");

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    container);

store.dispatch({ type: "obtener-productos"});