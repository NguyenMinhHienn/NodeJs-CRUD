import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    removeProduct,
} from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", removeProduct);

export default router;
