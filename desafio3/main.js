//desafio entregable n°2


const express = require ("express");
const server  = require("http");
const Contenedor = require("./constructor.js");

const app = express();

const  port = 8080;


const contenedor1 = new Contenedor("./productos.json")

app.get ("/productos", (req, res)=>{
    res.send(
        contenedor1.getAll()
        ) 
 });

 app.get ("/productosRandom", (req, res)=>{
    res.send(
      contenedor1.random(1, 4)
    )
});

 app.listen(port,()=>{ 
    console.log("SERVIDOR ESTA CORRIENDO EN EL PUERTO: "+ port)
})