import api from "./api";

const apiMiddleware = (store) => (next) => async (action) => {
    if(action.type === "obtener-productos"){
        const productos = await api.all();
        store.dispatch({ type: "asignar-productos", payload: productos});
    }else{
        next(action);
    }
}

export default apiMiddleware;