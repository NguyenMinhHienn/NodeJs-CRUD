import {
    createProduct,
    getProductById,
    getProducts,
    removeProduct,
    updateProduct,
} from "../controllers/product";
import { Router } from "express";
const router = Router();
router.get(`/products`, getProducts);
router.get(`/products/:id`, getProductById);
router.post(`/products`, createProduct);
router.put(`/products/:id`, updateProduct);
router.delete(`/products/:id`, removeProduct);
export default router;
