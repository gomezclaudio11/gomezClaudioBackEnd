const { Router, response } = require ("express")

const userRouter = Router ();

const Contenedor = require("../contenedor");
const contenedor1 = new Contenedor("./productos.txt");

userRouter.get ("/api/productos", async (req, res)=>{
  res.send(
      await contenedor1.getAll()
      ) 
  });

  userRouter.get ("/api/productos/:id", async (req, res)=>{
    res.send(
        await contenedor1.getById()
        ) 
     
    });
  

module.exports = userRouter;