import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: String,
      qty: Number,
      price: Number,
      image: String,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  itemPrice: Number,
  shippingCharge: {
    type: Number,
    default: 100,
  },
  totalPrice: Number,
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
