const mongoose = require("mongoose");

const ProductosScheme = new mongoose.Schema(
  {
    nombre: {
        type: String,
        required: true,
      },
      categoria: {
        type: Number,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
  },
  {
    timestamps: true, //TODO: createdAt, updatedAt
    versionKey: false,
  }
);

const Productos = mongoose.model("productos", ProductosScheme);

module.exports = { Productos };

//methods
const all = () => Productos.find({});

const filter = ()=> Productos.find({ nombre: {$regex: filtro, $options: "i"} });
const add = () => {
    const nuevoProducto = new Productos({...producto, total: producto.cantidad * producto.precio });
    return nuevoProducto.save();
};

const single = (_id) => Productos.findOne({_id});
const update = (_id, producto) => Productos.findOneAndUpdate({_id}, producto, {new: true});
const remove = (_id) => Productos.findOneAndRemove({_id});

export default {
    all, 
    filter,
    add,
    single,
    update,
    remove
}