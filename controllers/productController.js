import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
export const productController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and size will less than 1 mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product",
      error,
    });
  }
};

//get all product controller
export const getProductController = async (req,res) => {
  try {
    const products = await productModel.find({}).populate('category').limit(12);
    res.status(200).send({
      message: "all products",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product",
      error,
    });
  }
};

//get product photo

export const getProductPhotoController = async(req,res)=>{
    try {
        const products = await productModel.findById(req.params.pid).select("photo");
        if(products.photo.data){
            res.set("Content-type",products.photo.contentType)
        }
        res.status(200).send(products.photo.data);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in product photo api",
          error,
        });
      }
}
