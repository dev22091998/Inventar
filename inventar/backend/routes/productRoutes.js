const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, createProduct);
router.patch("/:id", protect, updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;