const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCantidad = document.getElementById("cantidad");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");

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

//function para crear nuevas filas en la tabla
function renderTable(productos) {


    const filas = productos.map((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML =
            `<td>${item.codigo}</td>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>${item.precio}</td>
        <td>${item.categoria}</td>
        <td>
            <div class="btn-group">
                <a href="#" class="btn btn-small btn-outline-secondary" onClick="onEdit(event)">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a href = "#" onClick = "onDelete(event)" class="btn btn-small btn-outline-danger">
                    <i class='bi bi-trash'></i>
                </a>
            </div>
        </td>`;
        return tr;
    });
    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

}

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 1,
        nombre: "Prueba a"
    }
});

//modificado
store.dispatch({
    type: "producto-modificado",
    payload: {
        id: 1,
        nombre: "Prueba a-v2"
    }
});

//otro agregado

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 2,
        nombre: "Prueba b"
    }
});

store.dispatch({
    type: "producto-eliminado",
    payload: {
        id: 1
    }
});