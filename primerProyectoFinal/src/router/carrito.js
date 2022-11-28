const { Router } = require ("express");
const ProductContenedor = require("../contenedor");

const carritoRouter = Router ();

const productContenedor = new ProductContenedor();

carritoRouter.post ("/",  (req, res)=>{
    console.log("crear un carrito", req.body);
    const productId = productContenedor.save(req.body);
    res.json({
        ...req.body,
        id: productId
    });
});

carritoRouter.delete ("/:id",  (req, res)=>{
    productContenedor.deleteById(req.params.id);
    res.json({message: "Producto eliminado"})
});

carritoRouter.get ("/:id",  (req, res)=>{
    console.log(req.params.id);
    const product = productContenedor.getById(req.params.id);
    if (product === null){
        res.json({error: "el carrito esta vacio"});
    } else {
        res.json(product);
    }
});

carritoRouter.post ("/:id/productos", (req, res)=>{

});

carritoRouter.delete ("/:id/productos/:id_prod", (req, res)=>{

});








module.exports = carritoRouter;
