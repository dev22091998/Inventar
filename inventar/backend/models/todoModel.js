const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
