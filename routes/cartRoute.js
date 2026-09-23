import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  addToCartController,
  deleteCartItemController,
  getCartItemsController,
  updateCartItemController,
} from "../controllers/cartController.js";

const router = express.Router();

// ADD ITEM INTO CART
router.post("/add-to-cart", requireSignIn, addToCartController);

// GET CART ITEMS
router.get("/get-cart-items", requireSignIn, getCartItemsController);

//UPDATE CART ITEM
router.put('/update-cart-item',requireSignIn, updateCartItemController)

// DELETE CART ITEM
router.delete(
  "/delete-cart-item/:pId",
  requireSignIn,
  deleteCartItemController
);

export default router;
