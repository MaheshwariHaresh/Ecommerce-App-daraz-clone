import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true, // store product price at the time of order
        },
        color: { type: String, default: null },
        size: { type: String, default: null },
      },
    ],
    amount: {
      type: Number,
      required: true, // total amount of order
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      province: {
        type: String,
        enum: ["Sindh", "Punjab", "KPK", "Balochistan"],
      },

      city: { type: String },
      area: { type: String },
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Packed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Canceled",
      ],
    },
    paymentMethod: {
      type: String,
      default: "COD",
      enum: ["COD", "Card", "Bank"],
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Refunded"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
