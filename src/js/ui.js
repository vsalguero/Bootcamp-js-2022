export const ui = {
    onEliminarClick: (codigo) => { },
    onEditarClick: (codigo) => { },

    onFormSubmit: (data) => {

    },
    renderForm,
    renderTable



}

const form = document.getElementsByTagName("form")[0];
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCantidad = document.getElementById("cantidad");
const inputPrecio = document.getElementById("precio");
const selectCategoria = document.getElementById("categoria");
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    event.preventDefault();

    const data = new FormData(form);

    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    });
});

function renderForm(producto) {
    inputCodigo.value = producto.codigo;
    inputNombre.value = producto.nombre || "";
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

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
            ui.onEliminarClick(item.codigo);
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEditarClick(item.codigo);
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

