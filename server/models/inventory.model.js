const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [3, "Product name must be at least 3 characters long"],
    },
    productBrand: {
      type: String,
      required: [true, "Brand name is required"],
      minlength: [3, "Brand name must be at least 3 characters long"],
    },
    productSize: {
      type: String,
      required: [true, "Size is required"],
      minlength: [1, "Size must be at least 1 characters long"],
    },
    productQuantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be greater than 0"],
    },
    productPrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },
    productDescription: {
      type: String,
      required: [true, "Description is required"],
      minlength: [3, "Description must be at least 3 characters long"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
