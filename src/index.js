//import "./js/app";
import React from "react";
import ReactDom from "react-dom";
import logo from "./logo.png";

import "./index.css";


const container = document.getElementById("root");

const App = () => (
    <div className="app"><h1>Hola React!!!</h1>
    <br /><img src={logo} />
    </div>
);

ReactDom.render(<App />, container);