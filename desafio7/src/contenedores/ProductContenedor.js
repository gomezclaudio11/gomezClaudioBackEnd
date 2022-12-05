const products = [
    {
      nombre: "cafe",
      precio: 20,
      url: "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_caffe-latte-machhiato-512.png",
      id: 1
    },
    {
      nombre: "cafe con leche",
      precio: 20,
      url: "https://cdn3.iconfinder.com/data/icons/hotel-restaurant-line-vol-1/52/bear__bar__caffe__cup__drink__coffee__tea-512.png",
      id: 2
    },
    {
      nombre: "cafe chico",
      precio: 20,
      url: "https://cdn0.iconfinder.com/data/icons/pixa-vol-4/160/coffe-cup-512.png",
      id: 3
    },
    {
      nombre: "cafe late",
      precio: 20,
      url: "https://cdn4.iconfinder.com/data/icons/local-user-interface-1/5000/caffe_area_local_user_interface_display-512.png",
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
