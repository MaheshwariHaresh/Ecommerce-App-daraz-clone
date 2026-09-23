import cartModel from "../models/cartModel.js";

// Add or Update Cart Item
export const addToCartController = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the decoded JWT
    const { productId, quantity } = req.body;

    // Find or Create Cart for the User
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ user: userId, products: [] });
    }

    // Check if Product already exists in Cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      // Update quantity if product exists
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ product: productId, quantity });
    }

    // Save Cart
    await cart.save();

    res.status(200).send({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while adding to cart",
      error: error.message,
    });
  }
};

// Get User Cart Items
export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the decoded JWT

    let cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      cart = { products: [] };
    }

    res.status(200).send({
      success: true,
      message: "Cart items fetched successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching cart items",
      error: error.message,
    });
  }
};

// Update Cart Itme Contorller
export const updateCartItemController = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await cartModel.findOne({ user: req.user._id });

    // finding product in Cart
    const product = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Item not found in cart" });
    }

    product.quantity = quantity;
    await cart.save();

    return res
      .status(200)
      .send({ success: true, message: "Quantity updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error While Updating Cart Item" });
  }
};

// delete cart Item controller
export const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.pId;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found",
      });
    }
    // Filter out the product from the cart's products array
    const updatedProducts = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    if (updatedProducts.length === cart.products.length) {
      return res.status(404).send({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.products = updatedProducts;
    await cart.save();

    res.status(200).send({
      success: true,
      message: "Item Removed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting cart item",
    });
  }
};
