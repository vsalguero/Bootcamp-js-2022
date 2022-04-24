import api from "./api";

const asignarProductos = (payload) => ({
    type: "asignar-productos",
    payload
});

const apiMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case "obtener-productos":
            const productos = await api.all();
            store.dispatch(asignarProductos(productos));
            break;
        case "producto-agregado":
            const producto = await api.add(action.payload);
            const nuevosproductos = await api.all();
            store.dispatch(asignarProductos(nuevosproductos));
            //next({type: "producto-agregado", payload: producto});
            break;
        case "producto-modificado":
            const productomodificado = await api.update(action.payload);
            const productosmodificados = await api.all();
            store.dispatch(asignarProductos(productosmodificados));
            //next({type: "producto-agregado", payload: producto});
            break;
        case "producto-seleccionado":
            const {codigo} = action.payload;
            if(codigo ){
                const productoSeleccionado = await api.single(action.payload.codigo);
                next({ type: action.type, payload: productoSeleccionado })
            }else{
                next({ type: action.type, payload: {} });
            }           
            break;
        case "producto-eliminado":
            const productoEliminado = await api.remove(action.payload.codigo);
            const nuevoListado = await api.all();
            store.dispatch(asignarProductos(nuevoListado));
            //next({type: "producto-agregado", payload: producto});
            break;
        default:
            next(action);
            break;
    }

}

export default apiMiddleware;