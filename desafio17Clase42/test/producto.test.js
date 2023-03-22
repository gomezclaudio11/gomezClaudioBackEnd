import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import { Router } from "express";

const ProductRouter = new Router();


describe ("test productos api", async () => {
    let App = request(app);
    console.log(App);

    it("deberia listar los productos", async () => {
        const req = awaitApp.get (ProductRouter);
        expect(req.statusCode).equal(200);
    });

    it(" deberia crear un producto", async () => {
        const req = await App.get (ProductRouter).send ({
            nombre: "Agua",
            precio: "123"
        });

        expect(req.body).to.include.keys("nombre","precio", "_id");
        expect (req.statusCode).equal(200);
    })
})
