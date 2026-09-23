import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    loginType: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },

    password: {
      type: String,
      required: function () {
        return this.loginType === "email";
      },
    },

    phone: {
      type: String,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
      default: null,
    },

    address: {
      province: {
        type: String,
        enum: ["Sindh", "Punjab", "KPK", "Bolochistan"],
        default: null,
      },

      city: {
        type: String,
        default: null,
      },

      area: {
        type: String,
        default: null,
      },
    },

    role: {
      type: Number,
      default: 0,
    },

    date_of_birth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },

    resetToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
