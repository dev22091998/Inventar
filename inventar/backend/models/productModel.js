const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    inventory: {
      type: String,
      required: [true, "Please add a inventory"],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, "Please add a organization"],
      trim: true,
    },
    employee: {
      type: String,
      required: true,
      default: "-",
      trim: true,
    },
    old_inventory: {
      type: String,
      default: "-",
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    mac_lan: {
      type: String,
      default: "-",
      trim: true,
    },
    mac_wifi: {
      type: String,
      default: "-",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;