import express from "express";
const cors = require("cors");
const app = express();
//avoid compatibility problems with browsers 
app.use(cors());

let lastId = 1;
let productos = [
    {
        nombre: "producto a",
        cantidad : 2,
        precio : 10,
        codigo : lastId
    }
];

app.get("/", (req, res) => {
    res.send("<h1>Api de productos</h1>");
});

//Globar middleware for all request
app.use(logs);
//app.use(bodyParser.json({type: 'application/json'}));
app.use(express.json());

app.get("/productos", (req, res) => {
    const filtro = req.query.filtro;
    if(filtro){
        res.json(productos.filter(p => p.nombre.indexOf(filtro) >= 0));
    }else{
        res.json(productos);
    }
    
});

app.post("/productos", (req, res) => {
    console.log("Body:", req.body);
    lastId++;
    const producto = { ...req.body, codigo: lastId };
    productos.push(producto);
    res.status(201);
    res.json(producto);
});

//modificar
app.put("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const producto = productos.find(p => p.codigo == codigo);
    if (codigo) {
        const index = productos.indexOf(producto);
        const nuevoProducto = productos[index] = { ...req.body, codigo }
        res.status(200);
        res.json(nuevoProducto);
    } else {
        res.status(404);
        res.json({ message: "No existe ningun producto con ese codigo" + codigo });
    }
});

//delete
app.delete("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const producto = productos.find(p => p.codigo == codigo);
    if (codigo) {
        productos = productos.filter(x => x != producto);
        res.status(200);
        res.json({ message: "Producto eliminado" });
    } else {
        res.status(404);
        res.json({ message: "No existe ningun producto con ese codigo" + codigo });
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