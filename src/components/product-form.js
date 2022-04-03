import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarOModificarProducto } from "../store/store";


const ProductForm = () => {

  const categorias = [
    { codigo: 1, nombre: "Categoria 1" },
    { codigo: 2, nombre: "Categoria 2" },
    { codigo: 3, nombre: "Categoria 3" },
    { codigo: 4, nombre: "Categoria 4" }
  ];
  const producto = useSelector((state) => state.producto);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    codigo: 0,
    nombre: '',
    cantidad: '',
    precio: '',
    categoria: 1
  });

  useEffect(() => {
    setValues({
      codigo: producto.codigo || 0,
      nombre: producto.nombre || '',
      cantidad: producto.cantidad || '',
      precio: producto.precio || '',
      categoria: producto.categoria || 1
    })
  }, [producto]);

  const onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues((v) => ({
      ...v,
      [name]: value
    }));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...values,
      cantidad: parseInt(values.cantidad),
      precio: parseFloat(values.precio)

    }
    dispatch(agregarOModificarProducto(payload));
  }


  const canSave = !!(values.nombre && values.cantidad && values.precio);

  return (
    <form action="index.html" onSubmit={onSubmit}>
      <div className="mb-3">
        <input type="hidden" name="codigo" id="codigo" value={values.codigo} />
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" name="nombre" value={values.name} id="nombre" />
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="cantidad"
          value={values.cantidad}
          id="cantidad"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            name="precio"
            id="precio"
            value={values.precio}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoria</label>
        <select name="categoria" className="form-control" id="categoria">
          <option value="1">Categoria 1</option>
          <option value="2">Categoria 2</option>
          <option value="3">Categoria 3</option>
          <option value="4">Categoria 4</option>
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
};

export default ProductForm;