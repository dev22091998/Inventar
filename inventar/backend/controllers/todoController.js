// const Todo = require("../models/todoModel");

// // GET all todos
// const getTodos = async (req, res) => {
//   const todos = await Todo.find().sort({ createdAt: -1 });
//   res.json(todos);
// };

// // CREATE
// const addTodo = async (req, res) => {
//   const {
//     name, 
//     sku, 
//     category, 
//     // quantity, 
//     inventory, 
//     organization, 
//     employee, 
//     section, 
//     old_inventory, 
//     mac_lan, 
//     mac_wifi, 
//     // price, 
//     description} = req.body;
//     //   Validation
//   if (!name || !category || !inventory || !organization ) {
//     res.status(400);
//     throw new Error("Please fill in all fields");
//   }
//   // Create Product
//   const product = await Product.create({
//     user: req.user.id,
//     name,
//     sku,
//     category,
//     // quantity,
//     inventory,
//     organization,
//     employee,
//     section,
//     old_inventory,
//     mac_lan,
//     mac_wifi,
//     // price,
//     description,
//   });

//   const todo = await Todo.create(req.body);
//   // res.status(201).json(todo);
// };

// // UPDATE
// const updateTodo = async (req, res) => {
//   const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(todo);
// };

// // DELETE
// const deleteTodo = async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.json({ message: "Todo deleted" });
// };

// // GET /todos/:id  — single todo
// const getSingleTodo = async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);

//     if (!todo) {
//       return res.status(404).json({ message: "Todo topilmadi" });
//     }

//     res.json(todo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server xatosi" });
//   }
// };

// module.exports = {
//   getTodos,
//   addTodo,
//   updateTodo,
//   deleteTodo,
//   getSingleTodo,
// };

const Todo = require("../models/todoModel");

// GET all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// CREATE
const addTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

// UPDATE
const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
};

// DELETE
const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
// GET /todos/:id  — single todo
const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo topilmadi" });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Todo.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Todo.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getSingleTodo,
  createProduct,  getProducts
};

