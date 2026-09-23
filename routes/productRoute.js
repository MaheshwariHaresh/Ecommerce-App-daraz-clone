import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductsController,
  getProductByIdController,
  productCountController,
  productFilterController,
  productListController,
  searchProductController,
  updateProductController,
  getProductsByCategoryController,
} from "../controllers/productController.js";
const router = express.Router();

//  CREATE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  createProductController
);

//  UPDATE PRODUCT
router.put(
  "/update/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);

//  GET ALL PRODUCTS
router.get("/get-products", getProductsController);


// DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

// FILTER PRODUCTS BY CATEGORY OR SUBCATEGORY
router.get("/filter", productFilterController);

// PRODUCT COUNT
router.get("/count", productCountController);

// PRODUCT PER PAGE
router.get("/list/:page", productListController);

// SEARCH PRODUCT BY (KEYWORD CATEGORY SUBCATEGORY)
router.get("/search", searchProductController);

// GET PRODUCTS BY CATEGORY
router.get("/category-products/:id", getProductsByCategoryController);

//  GET SINGLE PRODUCT
router.get("/:pid", getProductByIdController);

// payments routes
// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
