const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { 
    name, 
    sku, 
    category,  
    inventory, 
    organization, 
    employee, 
    section, 
    old_inventory, 
    mac_lan, 
    mac_wifi, 
    description
   } = req.body;

  //   Validation
  if (!name || !category || !inventory || !organization ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    inventory,
    organization,
    employee,
    section,
    old_inventory,
    mac_lan,
    mac_wifi,
    description,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, inventory, organization, employee, section, old_inventory, mac_lan,
    mac_wifi, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }




  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      inventory,
      organization,
      employee,
      section,
      old_inventory,
      mac_lan,
      mac_wifi,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};