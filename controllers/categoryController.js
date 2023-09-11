import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "name is Required",
      });
    }
    const existingCatgory = await categoryModel.findOne({name});
    if(existingCatgory){
       return res.status(200).send({
            success:true,
            message:"Category already exist"
        })
    }
    const category = await new categoryModel({ name ,slug:slugify(name),}).save();
    console.log(category)
    res.status(201).send({
      message: "category created successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Categroy",
      error,
    });
  }
};

//get category

export const getAllCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.send({
            message:"All categories list",
            success:true,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error on get category"
        })
    }
}

//get signle category

export const singleCategoryController = async (req,res)=>{
try {
    const category = await categoryModel({slug:req.params.slug});
    res.status(200).send({
        success:true,
        category,
        message:"single category"
    })
} catch (error) {
    console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while single category"
        })
}
}
