import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import productos from "./mongodb";
//import productos from "./in-memory/productos";

console.log(productos);

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if(!err){
        console.log("Conexión Correcta");
    }else{
        console.log("Error de conexión");
    }
});

};

export { productos, dbConnect };