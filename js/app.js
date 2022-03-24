const preloadedState = {
    producto: {},
    productos: []
};


const middlewares = Redux.applyMiddleware(
    loggerMidleware,
    agregarOModificarProductoMidleware,
);
const store = Redux.createStore(reducer, preloadedState, middlewares);

let latestState;

const subscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    }
});

ui.onFormSubmit = (producto) => store.dispatch(agregarOModificarProducto(producto));

ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));

ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));