import React from "react";
import "./app.css";
import ProductForm from "./components/product-form";
import ProductList from "./components/product-list";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";

const App = () => {
  return <main className="container">
    <ConnectedRouter history={history}>
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

    </ConnectedRouter>




  </main>
}

export default App;