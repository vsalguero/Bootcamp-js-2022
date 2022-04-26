import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { agregarOModificarProducto, productoSeleccionado } from "../store/store";


const ProductForm = () => {

  const categorias = [
    { codigo: 1, nombre: "Categoria 1" },
    { codigo: 2, nombre: "Categoria 2" },
    { codigo: 3, nombre: "Categoria 3" },
    { codigo: 4, nombre: "Categoria 4" }
  ];
  const {codigo} = useParams();
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
    });

    if(codigo != producto.codigo){
      dispatch(productoSeleccionado(codigo));
    }

  }, [producto.codigo]);

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
        <input type="hidden" name="codigo" id="codigo" value={values.codigo} onChange={onChange} />
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" name="nombre" value={values.nombre} onChange={onChange} id="nombre" />
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="cantidad"
          value={values.cantidad}
          onChange={onChange}
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
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoria</label>
        <select name="categoria" className="form-control" id="categoria" value={values.categoria} onChange={onChange}>
          {categorias.map(c => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary" disabled={!canSave}>Guardar</button>
      </div>
    </form >
  );
};

export default ProductForm;