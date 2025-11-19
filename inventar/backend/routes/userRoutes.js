const express = require("express");
const router = express.Router();
const { loginUser, registerAdmin } = require("../controllers/userController");

// login
router.post("/login", loginUser);

// admin yaratish (faqat bir marta ishlating!)
router.post("/register", registerAdmin);

module.exports = router;
