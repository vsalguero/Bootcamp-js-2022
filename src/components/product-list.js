import React from "react";

const ProductList = () => {
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
      <tbody></tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Totales:</td>
          <td id="cantidad-total">10</td>
          <td id="precio-total">100</td>
          <td id="gran-total">100</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    );
};

export default ProductList;