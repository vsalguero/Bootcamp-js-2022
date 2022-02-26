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

let index = 0;
let cantidadTotal = 0;
let precioTotal = 0;
let granTotal = 0;
let currentRow;

form.addEventListener("submit", onSubmit);

/**
 *
 * @param {Event} event
 */
function onSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);

  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

  let codigo = frmCodigo[1];
  const nombre = frmNombre[1];
  const cantidad = frmCantidad[1];
  const precio = frmPrecio[1];
  const categoria = frmCategoria[1];
  const total = cantidad * precio;

  cantidadTotal = parseInt(cantidad) + cantidadTotal;
  precioTotal = parseFloat(precio) + precioTotal;
  granTotal = parseFloat(total) + granTotal;

  let tr;

  if (!codigo) {
    index++;
    codigo = index;
    tr = document.createElement("tr");
    tbody.appendChild(tr);
    //guardar dataset en la fila para agregar la categoria a la que corresponde
    tr.dataset.categoria = categoria;
  } else {
    tr = currentRow;
  }

  tr.innerHTML =
    "<td>" +
    codigo +
    "</td>" +
    "<td>" +
    nombre +
    "</td><td> " +
    cantidad +
    "</td><td>" +
    precio +
    "</td>" +
    categoria +
    "</td><td><a href='#' onClick='onEdit(event)'>Editar</a> | <a href='#' onClick='onDelete(event)'>Eliminar</a></td>";

  cantidadTotalElement.innerText = cantidadTotal;
  precioTotalElement.innerText = precioTotal;
  granTotalElement.innerText = granTotal;
}
/**
 *
 * @param {Event} event
 */

function onEdit(event) {
  event.preventDefault();
  /** @type {HTMLElement} */
  const anchor = event.target;
  const tr = anchor.parentElement.parentElement;
  const celdas = tr.getElementsByTagName("td");
  const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;

  inputCodigo.value = tdCodigo.innerText;
  inputNombre.value = tdNombre.innerText;
  inputCantidad.value = tdCantidad.innerText;
  inputPrecio.value = tdPrecio.innerText;
  inputCategoria.value = tr.dataset.categoria;

  currentRow = tr;
}

/**
 *
 * @param {Event} event
 */
function onDelete(event) {
  event.preventDefault();
  /** @type {HTMLElement} */
  const anchor = event.target;
  const tr = anchor.parentElement.parentElement;
  tbody.removeChild(tr);
}
