import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/subCategoryModel.js";

// create sub category
export const createSubCategoryController = async (req, res) => {
  try {
    const { name, image, categoryId } = req.body;

    if (!name) {
      return res.status(500).send({ message: "Name is Required" });
    }
    if (!image) {
      return res.status(500).send({ message: "Image is Required " });
    }
    if (!categoryId) {
      return res.status(500).send({ message: "Category Id is Required" });
    }

    const existingCategory = await subCategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const subCategory = new subCategoryModel({
      name,
      image,
      slug: slugify(name),
    });
    await subCategory.save();
    await categoryModel.findByIdAndUpdate(categoryId, {
      $push: { subCategories: subCategory._id },
    });

    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      subCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Sub Category API",
      error,
    });
  }
};

// update sub category
export const updateSubCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;
    const subCategory = await subCategoryModel.findByIdAndUpdate(
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
      subCategory,
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

// get sub category by id controller
export const getSubCategoryByIdController = async (req, res) => {

  const {id}= req.params
  try {
    const subCategory = await categoryModel.findById(id)
    res.status(200).send({
      success: true,
      message: "Category Fetched Successfully",
      subCategory,
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

// delete sub category controller
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    // await productModel.deleteMany({ category: id });
    await subCategoryModel.findByIdAndDelete(id);

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