const products = [
  {
    nombre: "cafe",
    precio: 20,
    url: "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_caffe-latte-machhiato-512.png",
    descripcion: "Delicioso cafe colombiano", 
    stock:32,
    codigo: 123,
    id: 1,
    timestamp: Date.now()
  },
  {
    nombre: "cafe con leche",
    precio: 20,
    url: "https://cdn3.iconfinder.com/data/icons/hotel-restaurant-line-vol-1/52/bear__bar__caffe__cup__drink__coffee__tea-512.png",
    descripcion: "Un clasico porteño",
    stock: 15,
    codigo: 456,
    id: 2,
    timestamp: Date.now()
  },
  {
    nombre: "cafe chico",
    precio: 20,
    url: "https://cdn0.iconfinder.com/data/icons/pixa-vol-4/160/coffe-cup-512.png",
    descripcion: "Degusta un cafe al paso",
    stock: 19,
    codigo: 789,
    id: 3,
    timestamp: Date.now()
  },
  {
    nombre: "cafe late",
    precio: 20,
    url: "https://cdn4.iconfinder.com/data/icons/local-user-interface-1/5000/caffe_area_local_user_interface_display-512.png",
    descripcion: "Una delicia que te traera buenos momentos",
    stock: 33,
    codigo: 159,
    id: 4,
    timestamp: Date.now()
  }
]

const carrito = [
{id: 1}
]


class ProductContenedor {
    constructor(){
        this.products = products;
        this.carrito = carrito;
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

    
    saveCarrito(carrit){
      carrit.id = this.getIdCarrito ();
      this.carrito.push(carrit);
      return carrit.id;
      }
  
    getIdCarrito (){
      const lastProduct= this.carrito[this.carrito.length - 1];
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

    
    getAllCarrito(){
      return this.carrito;
  }
    
    deleteById(id) {
        const productIndex = this.products.findIndex((item) => item.id === parseInt(id));
    this.products.splice(productIndex, 1);
    return ;
   }

   deleteByIdCarrito(id) {
    const productIndex = this.carrito.findIndex((item) => item.id === parseInt(id));
    this.carrito.splice(productIndex, 1);
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
