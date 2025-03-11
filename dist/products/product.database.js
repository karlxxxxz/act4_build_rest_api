"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
let products = loadProducts();
function loadProducts() {
    try {
        const data = fs_1.default.readFileSync("./products.json", "utf8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error loading products:", error);
        return {};
    }
}
function saveProducts() {
    try {
        fs_1.default.writeFileSync("./products.json", JSON.stringify(products, null, 2));
    }
    catch (error) {
        console.error("Error saving products:", error);
    }
}
const findAll = async () => {
    return Object.values(products);
};
exports.findAll = findAll;
const findOne = async (id) => {
    return products[id] || null;
};
exports.findOne = findOne;
const create = async (productData) => {
    let id;
    do {
        id = (0, uuid_1.v4)();
    } while (products[id]);
    const newProduct = { ...productData, id };
    products[id] = newProduct;
    saveProducts();
    return newProduct;
};
exports.create = create;
const update = async (id, updateValues) => {
    if (!products[id])
        return null;
    products[id] = { ...products[id], ...updateValues };
    saveProducts();
    return products[id];
};
exports.update = update;
const remove = async (id) => {
    if (!products[id])
        return;
    delete products[id];
    saveProducts();
};
exports.remove = remove;
