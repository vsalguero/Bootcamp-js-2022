//inicializa la variable
let indice = 1;

const reducer = (state, action) => {
    if (action.type == "producto-agregado") {
        const codigo = indice++;
        const producto = action.payload;
        const total = producto.cantidad * producto.precio;
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...producto,
                    codigo,
                    total
                }
            ]
        }
    }
    if (action.type == "producto-modificado") {

        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = { ...producto, total };
        return {
            ...state,
            productos
        }


    }
    if (action.type == "producto-eliminado") {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }
    if (action.type == "producto-seleccionado") {
        const codigo = action.payload.codigo;
        return {
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {}
        }
    }
    return state;
};

const productoSeleccionado = (codigo) => ({
    type: "producto-seleccionado",
    payload: { codigo }
});


const productoEliminado = (codigo) => ({
    type: "producto-eliminado",
    payload: { codigo }
});

const productoModificado = (payload) => ({
    type: "producto-modificado",
    payload
});

const productoAgregado = (payload) => ({
    type: "producto-agregado",
    payload
});

const agregarOModificarProducto = (payload) => ({
    type: "producto-agregado-o-modificado",
    payload
});



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
const loggerMidleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("Next state", store.getState());
    return result;
}

const agregarOModificarProductoMidleware = store => next => action => {
    if (action.type != "producto-agregado-o-modificado"){
        return next(action);
    }
    const producto = action.payload;
    if (producto.codigo) {
        store.dispatch(productoModificado(producto));
    } else {
        store.dispatch(productoAgregado(producto));
    }
    return store.dispatch(productoSeleccionado(null));

}
