import request from "supertest";
import { expect } from "chai";
import app from "../app.js";



describe ("test productos api", async () => {
    let App = request(app);
    console.log(App);

    it("deberia listar los productos", async () => {
        const req = await App.get ("/api/products");
        expect(req.statusCode).equal(200);
    });

    it(" deberia crear un producto", async () => {
        const req = await App.get ("/api/products").send ({
            nombre: "Agua",
            precio: "123"
        });

        expect(req.body).to.include.keys("nombre","precio", "_id");
        expect (req.statusCode).equal(200);
    })
})
