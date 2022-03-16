const form = document.getElementsByTagName("form")[0];
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCantidad = document.getElementById("cantidad");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");

const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

const preloadedState = {
    producto: {},
    productos: []
};
let indice = 0;

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
    return state;
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        console.log(currentState.productos);
        renderTable(currentState.productos);
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
            <td>${item.total}</td>
            <td>
            <div class="btn-group">
                <a href="#" class="btn btn-small btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a href="#"  class="btn btn-small btn-outline-danger">
                    <i class='bi bi-trash'></i>
                </a>
            </div>
        </td>`;
        const [editar, eliminar] = tr.getElementsByTagName("a");
        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto-eliminado",
                payload: {
                    codigo: item.codigo
                }
            })
        });
        return tr;
    });

    tbody.innerHTML = "";
    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    const cantidadTotal = sum(productos, x => x.cantidad);

    const precioTotal = sum(productos, x => x.precio);

    const granTotal = sum(productos, x => x.total);

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotalElement.innerText = granTotal;

    function sum(elem, selector) {
        return elem.map(selector).reduce((a, b) => a + b, 0);
    }


}



store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "Prueba a",
        cantidad: 3,
        precio: 10,
        categoria: 2
    }
});

//otro agregado

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "Prueba b",
        cantidad: 10,
        precio: 5.5,
        categoria: 1
    }
});

//modificado
store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "Prueba b-v2",
        cantidad: 11,
        precio: 12,
        categoria: 2
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "Prueba c",
        cantidad: 2,
        precio: 4,
        categoria: 4
    }
});


/*store.dispatch({
    type: "producto-eliminado",
    payload: {
        codigo: 2
    }
});*/