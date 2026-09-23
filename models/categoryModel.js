// Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    subCategories: [
      {
        type: mongoose.ObjectId,
        ref: "SubCategory",
      }
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
