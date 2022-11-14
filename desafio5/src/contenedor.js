const products = [
    {
      nombre: "cafe",
      precio: 20,
      categoria: "bebida",
      id: 1
    },
    {
      nombre: "cafe con leche",
      precio: 20,
      categoria: "bebida",
      id: 2
    },
    {
      nombre: "cafe chico",
      precio: 20,
      categoria: "bebida",
      id: 3
    },
    {
      nombre: "cafe late",
      precio: 20,
      categoria: "bebida",
      id: 4
    }
  ]



class ProductContenedor {
    constructor(){
        this.products = products;
    }

     save(product){
        product.id = this.getId ();
        this.products.push(product);
        return product.id;
        }
    
    getId (){
        const lastProduct= this.products[this.products.length - 1];
        const lastId = lastProduct.id;
        return lastId +1;
    }

    getById (id){
        const product = this.products.find((item) => item.id === parseInt(id));
        if(!product)
            return null;
        return product;
    }

    getAll(){
        return this.products;
    }
    
    deleteById(id) {
        const productIndex = this.products.findIndex((item) => item.id === parseInt(id));
    this.products.splice(productIndex, 1);
    return ;
   }
   deleteAll(){
    this.products= [];
    return;
   }

   update(id, product){
    const productIndex = this.products.findIndex((item) => item.id === parseInt(id));
    this.products.splice(productIndex, 1, { id: parseInt(id), ...product });
    return ;
}
}

module.exports = ProductContenedor
