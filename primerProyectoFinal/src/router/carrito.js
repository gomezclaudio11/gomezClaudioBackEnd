const { Router } = require ("express");
const ProductContenedor = require("../contenedor");

const carritoRouter = Router ();

const productContenedor = new ProductContenedor();

carritoRouter.post ("/",  (req, res)=>{
    const id = productContenedor.saveCarrito({ productos: [] });
    res.json({ id: id })
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
    const productoCarrito = productContenedor.updateCarrito(req.params.id, req.body)
   res.json ({ productoCarrito })
});

carritoRouter.delete ("/:id/productos/:id_prod", (req, res)=>{
    productContenedor.deleteByIdCarrito(req.params.id);
    res.json({message: "Producto eliminado"})
});








module.exports = carritoRouter;
