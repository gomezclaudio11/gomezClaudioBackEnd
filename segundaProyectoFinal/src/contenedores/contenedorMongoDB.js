import * as model from "../index"

//create
console.log("create")
const producto = {nombre: "leche", precio: 245, stock: 100}

const productoSaveModel = new model.productos(producto)
let productoSave = await productoSaveModel.save()
console.log(productoSave);

//read

console.log("read");
let productos = await model.productos.find({})
console.log(productos);

//update

console.log("update");
let productoUpdate = await model.productos.udpateOne( {nombre: "leche"}, {
    $set: {stock: 99}
})
console.log(productoUpdate);

//delete
console.log("delete");
let productoDelete = await model.productos.deleteOne()
console.log(productoDelete);