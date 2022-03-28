import React from "react";


const ProductForm = () => {
    return (
     <form action="index.html">
      <div className="mb-3">
        <input type="hidden" name="codigo" id="codigo" />
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" name="nombre" id="nombre" />
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="cantidad"
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