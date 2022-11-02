//desafio entregable n°3


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
        const allProducts =  await contenedor1.getAll()
        const random = parseInt (Math.random()*allProducts.length)
        await res.send(allProducts[random])
         
    });
    
    app.listen(port,()=>{ 
        console.log("SERVIDOR ESTA CORRIENDO EN EL PUERTO: "+ port)
    })