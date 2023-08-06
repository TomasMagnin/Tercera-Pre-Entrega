import { config } from "../config/config.js";
import { mongoose } from "mongoose";

let Products;
let Carts;

switch (config.persistence) {
    case 'MONGO':
        console.log('Mongo connected');

        mongoose.connect(process.env.MONGODB_URL);
        const ProductsMongo = require('./mongo/products.mongo.js').default;
        const CartsMongo = require('./mongo/carts.mongo.js').default;
        Products = ProductsMongo;
        Carts = CartsMongo;

    break;
    case 'FILESYSTEM':
        console.log('Persistence with Memory');
        const ProductsMemory = require('./memory/ProductManager.js').default;
        const CartsMemory = require('./memory/CartManager.js').default;
        Products = ProductsMemory;
        Carts = CartsMemory

    break;
    default:
    break;
}

exports.Products = Products;
exports.Carts = Carts;