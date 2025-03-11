"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database = __importStar(require("./product.database"));
const http_status_codes_1 = require("http-status-codes");
const router = express_1.default.Router();
router.get("/products", async (req, res) => {
    try {
        const products = await database.findAll();
        if (!products.length) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "No products found" });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ total: products.length, products });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});
router.get("/product/:id", async (req, res) => {
    try {
        const product = await database.findOne(req.params.id);
        if (!product) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(product);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});
router.post("/product", async (req, res) => {
    try {
        const { name, price, quantity, image } = req.body;
        if (!name || !price || !quantity) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
            return;
        }
        const product = await database.create({ name, price, quantity, image });
        res.status(http_status_codes_1.StatusCodes.CREATED).json(product);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});
router.put("/product/:id", async (req, res) => {
    try {
        const { name, price, quantity, image } = req.body;
        if (!name || !price || !quantity) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
            return;
        }
        const product = await database.findOne(req.params.id);
        if (!product) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
            return;
        }
        const updatedProduct = await database.update(req.params.id, req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedProduct);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});
router.delete("/product/:id", async (req, res) => {
    try {
        const product = await database.findOne(req.params.id);
        if (!product) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
            return;
        }
        await database.remove(req.params.id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});
exports.default = router; // ✅ Correct default export
