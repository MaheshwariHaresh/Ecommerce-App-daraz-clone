import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    colors: [String],
    sizes:[String],
    tags: [String],

     discount: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.ObjectId,
      ref: "SubCategory",
    },

    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    image: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
