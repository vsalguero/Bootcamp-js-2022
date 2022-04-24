import mongoose from "mongoose";
import productos from "./productos";

mongoose.connect("mongodb+srv://vsalguero:74gIL7iXlsogZojV@cluster0.4yq0r.mongodb.net/BootcampDB?retryWrites=true&w=majority", () =>{
    console.log("Conectado a la base de datos");
});

export default { productos };

