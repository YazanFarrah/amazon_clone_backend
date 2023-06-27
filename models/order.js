const mongoose = require("mongoose");
const { productSchema } = require("./product");

const orderSchema = mongoose.Schema({
  products: [
    {
      products: productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  userID: {
    required: true,
    type: String,
  },
  orderedAt: {
    type: Number,
    required: true,
  },

  status: {
    type: Number,
    // 0 pending, 1 completed, 2 recieved, 3 delivered
    default: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
