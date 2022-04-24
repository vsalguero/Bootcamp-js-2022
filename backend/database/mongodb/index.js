import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import productos from "./productos";

mongoose.connect(process.env.DB_URI, () =>{
    console.log("Conectado a la base de datos");
});

export default {productos};

