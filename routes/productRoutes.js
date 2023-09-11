import express from 'express';
import { getProductController, getProductPhotoController, productController } from '../controllers/productController.js';
import formidable from 'express-formidable';

//router object
const router = express.Router();

//create product

router.post("/create-product",formidable(),productController)

// get all product

router.get("/get-products",getProductController);

//get product photo

router.get('/product-photo/:pid',getProductPhotoController)
export default router;
