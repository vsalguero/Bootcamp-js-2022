import mongoose from "mongoose";
import productos from "./productos";

mongoose.connect("mongodb:localhost/productos", () =>{
    console.log("Conectado a la base de datos");
});

export default {productos};

