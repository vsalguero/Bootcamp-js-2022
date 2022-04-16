import express from "express";
const app = express();

let lastId = 1;
const productos = [
    {
        nombre: "producto a",
        cantidad : 2,
        precio : 10,
        codigo : lastId
    }
];

app.get("/", (req, res) => {
    res.send("<h1>Hola mundo</h1>");
});

//Globar middleware for all request
app.use(logs);
//app.use(bodyParser.json({type: 'application/json'}));
app.use(express.json());

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.post("/productos", (req, res) => {
    console.log("Body:", req.body);
    lastId++;
    const producto = { ...req.body, codigo: lastId };
    productos.push(producto);
    res.status(201);
    res.json(producto);
});

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



app.listen(5000, () => {
    console.log("Escuchando en el puerto 5000");
});