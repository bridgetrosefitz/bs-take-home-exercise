import express from "express";
import productsRouter from "../controllers/products.js";

const router = express.Router();

router.get("/", productsRouter.getFilteredProducts);
router.get("/scores", productsRouter.getProductScores);

export default router;
