//desafio entregable n°2


const express = require ("express");
const Contenedor = require("./contenedor.js");

const app = express();

const  port = 8080;


const contenedor1 = new Contenedor("./productos.txt")

app.get ("/productos", async (req, res)=>{
    res.send(
        await contenedor1.getAll()
        ) 
    });
    
    app.get ("/productosRandom", async(req, res)=>{
        await res.send(
        const allProducts = contenedor1.getAll()
        const randon = parseInt (Math.random()*allProducts.length)
        console.log(randon))    
    });
    
    app.listen(port,()=>{ 
        console.log("SERVIDOR ESTA CORRIENDO EN EL PUERTO: "+ port)
    })