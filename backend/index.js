import http from "http";
//const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type" : "application/json"});
    res.write(JSON.stringify([
        {
            codigo: 1, 
            nombre: "producto 1", 
            precio: 10, 
            cantidad: 2
        },
        {
            codigo: 2, 
            nombre: "producto 2", 
            precio: 10, 
            cantidad: 2
        }
    ]));
    res.end();
});

server.listen(5000, ()=>{
    console.log("Servidor escuchando en el puerto 5000");
});

