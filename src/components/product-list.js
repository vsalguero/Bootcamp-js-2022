import React from "react";

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
          onClick={() => acciones.seleccionar(producto)}
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
  const productos = [
    {
      codigo: 1,
      nombre:"Producto A",
      cantidad: 10,
      precio: 100,
      total: 1000
    },
    {
      codigo: 2,
      nombre:"Producto B",
      cantidad: 5,
      precio: 60,
      total: 300
    }
  ];

  const seleccionar = (item) =>{
      console.log("seleccionar: ", item);
  }

  const eliminar = (codigo) =>{
    console.log("seleccionar: ", codigo);
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