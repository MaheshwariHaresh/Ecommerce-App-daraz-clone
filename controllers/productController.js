import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      subCategory,
      brand,
      discount,
      colors,
      tags,
      sizes,
    } = req.body;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !stock:
        return res.status(500).send({ error: "Stock is Required" });
      case !Array.isArray(image) || image.length === 0:
        return res.status(500).send({ error: "At least 1 image is required" });
    }
    const products = new productModel({
      name,
      description,
      price,
      category,
      stock: stock || 1,
      image,
      slug: slugify(name),
      subCategory,
      brand,
      discount,
      colors,
      tags,
      sizes,
    });
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Creating Product",
      error,
    });
  }
};

// UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      stock,
      image,
      brand,
      discount,
      colors,
      tags,
      sizes,
    } = req.body;

    // find product first
    const existingProduct = await productModel.findById(req.params.pid);
    if (!existingProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // update fields
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
        category: category || existingProduct.category,
        subCategory: subCategory || existingProduct.subCategory,
        stock: stock ?? existingProduct.stock,
        slug: name ? slugify(name) : existingProduct.slug,
        image: image && image.length > 0 ? image : existingProduct.image,
        brand: brand || existingProduct.brand,
        discount: discount ?? existingProduct.discount,
        colors: colors || existingProduct.colors,
        tags: tags || existingProduct.tags,
        sizes: sizes || existingProduct.sizes,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Updating Product",
      error,
    });
  }
};

// GET PRODUCT BY ID
export const getProductByIdController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req?.params?.pid )
      .populate("category subCategory");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// GET ALL PRODUCTS
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      { $match: {} },
      { $sample: {size:24} },
    ]);

    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product ",
      error,
    });
  }
};

// FILTER PRODUCTS BY CATEGORY OR SUBCATEGORY
export const productFilterController = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    let filter={}

    if(category){
      filter.category=category
    }
    if(subCategory){
      filter.subCategory=subCategory
    }
    
    const products = await productModel.find(filter).populate('category subCategory')
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while Filtering Products",
      error,
    });
  }
};

// COUNT TOTAL NUMBERS OF PRODUCTS
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Count",
      error: error.message
    });
  }
};

// FETCH PRODUCTS BY PAGE LIST
export const productListController = async (req, res) => {
  try {
    const perPage = 24;

    const products = await productModel.aggregate([
      { $match: {} },
      { $sample: { size: perPage } }, // Random 12 products
    ]);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error: error.message,
    });
  }
};

// SEARCH PRODUCT BY (KEYWORD CATEGORY SUBCATEGORY)
export const searchProductController = async (req, res) => {
  try {
    const { keyword, category, subcategory } = req.query;

    let filter={};

    if(keyword){
        filter.$or= [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { brand: { $regex: keyword, $options: "i" } },
          { tags: { $regex: keyword, $options: "i" } },
        ]
      
    }

    if(category){
      filter.category=category
    }
    if(subcategory){
      filter.subCategory=subcategory
    }

    const products = await productModel.find(filter).populate('category subCategory').sort({createdAt: -1})
  
    res.status(200).send({success:true, products});
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product API",
      error,
    });
  }
};

// GET PRODUCTS BY CATEGORY
export const getProductsByCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel
      .find({ category: id })
      .populate("category");
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// payment gateway controller
// token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


