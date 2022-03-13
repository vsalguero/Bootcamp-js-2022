const preloadedState = {
    producto: {},
    productos: []
};

const reducer = (state, action) => {
    if (action.type == 'producto-agregado') {
        return {
            ...state,
            productos: [
                ...state.productos, action.payload
            ]
        }
    }

    return state;
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        console.log("Estad", store.getState());
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 1,
        nombre: "Prueba a"
    }
});