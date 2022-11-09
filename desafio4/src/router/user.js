const { Router, response } = require ("express");
const ProductContenedor = require("../contenedor");

const productRouter = Router ();

const productContenedor = new ProductContenedor();

productRouter.get ("/",  (req, res)=>{ 
   const products = productContenedor.getAll();
   res.json(products)
  });

  productRouter.get ("/:id",  (req, res)=>{
    console.log(req.params.id);
    const product = productContenedor.getById(req.params.id);
    if (product === null){
        res.json({error: "producto no encontrado"});
    } else {
        res.json(product);
    }
});

productRouter.post ("/",  (req, res)=>{
    console.log("crear un producto", req.body);
    const productId = productContenedor.save(req.body);
    res.json({
        ...req.body,
        id: productId
    });
});

productRouter.put ("/:id",  (req, res)=>{
   productContenedor.update(req.params.id, req.body)
   res.json ({ message: "producto actualizado"})
});

productRouter.delete ("/:id",  (req, res)=>{
    productContenedor.deleteById(req.params.id);
    res.json({message: "producto borrado"})
});
  

  

module.exports = productRouter;