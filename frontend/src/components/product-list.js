import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productoEliminado, productoSeleccionado } from "../store/store";

const ProductItem = (prop) => {
  const producto = prop.producto;
  const acciones = prop.acciones;

  return <tr><td>{producto.codigo}</td>
    <td>{producto.nombre}</td>
    <td>{producto.cantidad}</td>
    <td>{producto.precio}</td>
    <td>{producto.total}</td>
    <td>
      <div className="btn-group">
        <a
          href="#"
          className="btn btn-small btn-outline-secondary"
          onClick={() => acciones.seleccionar(producto.codigo)}
        >
          <i className="bi bi-pencil-square"></i>
        </a>
        <a
          href="#"
          className="btn btn-small btn-outline-danger"
          onClick={() => acciones.eliminar(producto.codigo)}
        >
          <i className='bi bi-trash'></i>
        </a>
      </div>
    </td></tr>;
}

const ProductList = () => {

  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();

  const seleccionar = (codigo) => {
    dispatch(productoSeleccionado(codigo));
  }

  const eliminar = (codigo) => {
    dispatch(productoEliminado(codigo));
  }

  const acciones = {
    seleccionar,
    eliminar
  }
  const cantidadTotal = sum(productos, x => x.cantidad);
  const precioTotal = sum(productos, x => x.precio);
  const granTotal = sum(productos, x => x.total);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productos.map(item => <ProductItem key={item.codigo} producto={item} acciones={acciones} />)}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Totales:</td>
          <td id="cantidad-total">{cantidadTotal}</td>
          <td id="precio-total">{precioTotal}</td>
          <td id="gran-total">{granTotal}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

function sum(elem, selector) {
  return elem.map(selector).reduce((a, b) => a + b, 0);
}

//export {ProductItem, ProductList};

export default ProductList;