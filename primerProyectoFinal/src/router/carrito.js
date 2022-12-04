const { Router } = require ("express");
const ProductContenedor = require("../contenedor");

const carritoRouter = Router ();

const productContenedor = new ProductContenedor();

carritoRouter.post ("/",  (req, res)=>{
    const carritId = productContenedor.saveCarrito(req.body);
    res.json({
        ...req.body,
        id: carritId
    })
});

carritoRouter.get ("/:id/productos",  (req, res)=>{ 
    const products = productContenedor.getAllCarrito();
    res.json(products)
   });
   
carritoRouter.delete ("/:id",  (req, res)=>{
    productContenedor.deleteByIdCarrito(req.params.id);
    res.json({message: "Producto eliminado"})
});
   /*
carritoRouter.get ("/",  (req, res)=>{ 
    const products = productContenedor.getAllCarrito();
    res.json(products)
   });
 */

carritoRouter.post ("/:id/productos", (req, res)=>{

});

carritoRouter.delete ("/:id/productos/:id_prod", (req, res)=>{
    productContenedor.deleteByIdCarrito(req.params.id);
    productContenedor.deleteById(req.params.id);
    res.json({message: "Producto eliminado"})
});








module.exports = carritoRouter;
