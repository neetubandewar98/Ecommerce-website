import express from "express";
import { categoryController, getAllCategoryController, singleCategoryController } from "../controllers/categoryController.js";


//router object
const router = express.Router();
router.post("/create-category", categoryController);

//get category

router.get("/get-all-categories",getAllCategoryController);

//get single category
router.get("/single-category/:slug",singleCategoryController);


export default router;