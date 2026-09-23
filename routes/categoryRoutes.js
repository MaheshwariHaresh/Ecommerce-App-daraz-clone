import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getCategoriesController,
  createCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryByIdController,
  getSubCategoriesByParentIdController,
} from "../controllers/categoryController.js";

const router = express.Router();

// CREATE CATEGORY
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY
router.put(
  "/update/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// GET ALL CATEGORIES
router.get("/get-categories", getCategoriesController);

// GET SINGLE CATEGORY BY SLUG
router.get("/single-category/:slug", getSingleCategoryController);

// GET SUB-CATEGORIES BY ITS PARENT ID
router.get("/get-subcategories/:categoryId",getSubCategoriesByParentIdController )

// GET SINGLE CATEGORY BY ID
router.get("/get-category/:id", getCategoryByIdController);



// DELETE CATEGORY
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
