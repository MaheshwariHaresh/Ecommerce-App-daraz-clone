import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import slugify from "slugify";

// CREATE CATEGORY
export const createCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res.status(500).send({ message: "Name is Required" });
    }
    if (!image) {
      return res
        .status(500)
        .send({ message: "Image is Required and should be less then 1mb" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const category = new categoryModel({
      name,
      image,
      slug: slugify(name),
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "New Category Record Added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category API",
      error,
    });
  }
};

// UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: name ,
        slug: slugify(name),
        image: image ,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: " Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update API",
      error,
    });
  }
};

// GET ALL CATEGORIES
export const getCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find().populate('subCategories');
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all Categories",
      error,
    });
  }
};

// get category by slug controller
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Category",
      error,
    });
  }
};

// GET SUB-CATEGORIES BY ITS PARENT ID
export const getSubCategoriesByParentIdController = async(req, res)=>{
  const {categoryId}= req.params;
  try {
    const category = await categoryModel.findById(categoryId).populate("subCategories")
    res.status(200).send({
      success: true,
      message: "Sub Categories Fetched Successfully",
      subCategories:category.subCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Sub Categories",
      error,
    });
  }
}

// get category by id controller
export const getCategoryByIdController = async (req, res) => {

  const {id}= req.params
  try {
    const category = await categoryModel.findById(id).populate('subCategories')
    res.status(200).send({
      success: true,
      message: "Categorories Fetched Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Categories",
      error,
    });
  }
};

// delete category controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteMany({ category: id });
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `Category & Its All Products Deleted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Category",
      error,
    });
  }
};
