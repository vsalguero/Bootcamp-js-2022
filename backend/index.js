import express from "express";
import cors from "cors";
import { productos, dbConnect } from "./database/index";

const app = express();
//avoid compatibility problems with browsers 
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Api de productos</h1>");
});

dbConnect();

//Globar middleware for all request
app.use(logs);
//app.use(bodyParser.json({type: 'application/json'}));
app.use(express.json());

app.get("/productos", async (req, res) => {
    const filtro = req.query.filtro;
    let result;
    if (filtro) {
        result = await productos.filter(filtro);
    } else {
        result = await productos.all();
    }
    res.json(result);

});

app.get("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;
    const producto = await productos.single(codigo);

    if (codigo) {

        res.status(200);
        res.json(producto);
    } else {
        res.status(404);
        res.json({ message: "No existe ningun producto con ese codigo" + codigo });
    }
});


app.post("/productos", async (req, res) => {
    const producto = await productos.add(req.body);
    res.status(201);
    res.json(producto);
});

//modificar
app.put("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const nuevoProducto = await productos.update(codigo, req.body);
        res.status(200);
        res.json(nuevoProducto);
    } catch (error) {
        res.status(404);
        res.json({ error });
    }
});

//delete
app.delete("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        await productos.remove(codigo);
        res.status(200);
        res.json({ message: "Producto eliminado" });
    } catch (message) {
        res.status(404);
        res.json({ message });
    }
});


//middleware autenticate
/*function isAuthenticated(req, res, next) {
    const auth = req.headers.authorization;
    if(auth == "holamundo"){
        next();
    }else{
        res.status(401);
        res.send("Not authorized");
    }
}*/

//global middleware logs
function logs(req, res, next) {
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}

const port = process.argv[2] | process.env.PORT | 5001;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});