const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
    AsignarProductos: "asignar-productos"
}

export const producto = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ProductoSeleccionado:
            return action.payload;

        default:
            return state;
    }

}

export const productos = (state = [], action) => {

    switch (action.type) {
        case ActionTypes.AsignarProductos:
            return action.payload;

        default:
            return state;
    }

}

export const reducer = (state, action) => {

    switch (action.type) {
        case ActionTypes.ProductoSeleccionado:
            return {
                ...state,
                producto: action.payload
            }

        case ActionTypes.AsignarProductos:
            return {
                ...state,
                productos: action.payload
            };

        default:
            return state;
    }
};

export const productoSeleccionado = (codigo) => ({
    type: ActionTypes.ProductoSeleccionado,
    payload: { codigo }
});


export const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: { codigo }
});

export const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

export const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});

export const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});

export const storageMiddleware = store => next => action => {
    const actions = [
        ActionTypes.ProductoAgregado,
        ActionTypes.ProductoModificado,
        ActionTypes.ProductoEliminado
    ];

    const result = next(action);

    if (actions.indexOf(action.type) >= 0) {
        const state = store.getState();
        localStorage.setItem("state", JSON.stringify(state));
    }
    return result;

}

/*function loggerMidleware(store) {
    return function dispatchWrapper(next) {
        return function actionHandler(action) {
            next(action);
            const state = store.getState();
            console.log("dispatching", action);
            console.log("state", state);
        }
    }
}*/

//using arrow function 
export const loggerMidleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("Next state", store.getState());
    return result;
}

export const agregarOModificarProductoMidleware = store => next => action => {
    if (action.type != ActionTypes.ProductoAgregadoModificado) {
        return next(action);
    }
    const producto = action.payload;
    const actionToDispatch = producto.codigo ? productoModificado(producto) : productoAgregado(producto);

    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

function productoSeleccionadoReducer(state, action) {
    const codigo = action.payload.codigo;
    return {
        ...state,
        producto: state.productos.find(x => x.codigo == codigo) || {}
    };
}

export function generadorCodigoProductoBuilder(codigoInicial) {
    let codigo = codigoInicial;
    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado) {
            return next(action);
        }
        codigo++;
        const actionToDispatch = {
            ...action,
            payload: {
                ...action.payload,
                codigo
            }
        };
        return next(actionToDispatch);
    };
}