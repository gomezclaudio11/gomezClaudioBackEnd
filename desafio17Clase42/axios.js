import { Router } from "express";

const ProductRouter = new Router();

import axios from "axios";

axios.get(ProductRouter)
.then(function (response){
    console.log(response);
})
.catch(function (error) {
    console.log(error);
})
.then(function (){

})

axios.post (ProductRouter, {
    nombre: "leche",
    precio: "123"
}) 
.then ( function (response){
    console.log(response);
})
.catch ( function (error) {
    console.log(error);
})