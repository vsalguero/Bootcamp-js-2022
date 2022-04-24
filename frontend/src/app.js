import React from "react";
import "./app.css";
import ProductForm from "./components/product-form";
import ProductList from "./components/product-list";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return <main className="container">
    <BrowserRouter>
      <Switch>
        <Route path="/nuevo">
          <ProductForm />
        </Route>
        <Route path="/editar/:codigo">
          <ProductForm />
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>

    </BrowserRouter>




  </main>
}

export default App;