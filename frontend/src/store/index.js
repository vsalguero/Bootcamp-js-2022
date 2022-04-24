import { applyMiddleware, combineReducers, createStore } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import apiMiddleware from "./api-redux";
import * as storage from "./store";

const history = createBrowserHistory();

//const savedState = localStorage.getItem("state");
//const deserialized = savedState && JSON.parse(savedState);

const preloadedState = {
    producto: {},
    productos: []
};


const middlewares = applyMiddleware(
    storage.loggerMidleware,
    routerMiddleware(history),
    apiMiddleware,
    storage.agregarOModificarProductoMidleware,
    //storage.generadorCodigoProductoBuilder(0),
    //storage.storageMiddleware
);

const reducer = combineReducers({
    router: connectRouter(history),
    producto: storage.producto,
    productos: storage.productos
});

const store = createStore(reducer, preloadedState, middlewares);
export {history};
export default store;