import express from "express";

import { graphqlHTTP } from "express-graphql";

import { buildSchema } from "graphql";

import ProductService from "./service/product.service.js";
const ProductServices = new ProductService ();

const productTypeDef = `
    type Product {
        title: String,
        _ID: id,
        price: String,
        description: String,
        thumbnail: String
    }

    input ProductInput{
        title: String,
        price: String,
        description: String,
        thumbnail: String
    }
    type Query{
        getProduct(id: ID!): Product,
        getAllProduct(): [Product]
    }

    type Mutation {
        createProduct (data: ProductInput!)
    }

`

const getProduct = async ({id}) => {
    const data = await ProductServices.getProductById(id);
    return data;
};

const getAllProduct = () => {

}

const createProduct = ({data})  =>{
    return {
        ...data,
        _id: "1",
    }
}

const schema = buildSchema (productTypeDef)

const app = express();

app.use ("/graphql", graphqlHTTP(
    {
        schema,
        rootValue: {
            getProduct,
            getAllProduct,
            createProduct
        },
        graphiql: true
    }
))

app.listen(3001, () => console.log ("conectados"))