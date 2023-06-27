const mongoose = require("mongoose");

const supportSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: "support",
  },
});

const Support = mongoose.model("Support", supportSchema);
module.exports = Support;
