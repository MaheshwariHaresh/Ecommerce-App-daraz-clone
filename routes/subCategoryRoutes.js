import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createSubCategoryController,
  getSubCategoryByIdController,
  deleteSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategoryController.js";

const router = Router();

// CREATE SUB-CATEGORY
router.post("/create", requireSignIn, isAdmin, createSubCategoryController);

//UPDATE SUB CATEGORY
router.put("/update/:id", requireSignIn, isAdmin, updateSubCategoryController);

// GET SUB-CATEGORY BY ID
router.get("/get-category/:id", getSubCategoryByIdController);

// DELETE SUB CATEGORY
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteSubCategoryController
);

export default router;
