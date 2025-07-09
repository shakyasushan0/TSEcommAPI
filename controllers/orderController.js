import Order from "../models/orderModel.js";

const addOrder = async (req, res) => {
  const order = req.body;
  const addedOrder = await Order.create({ ...order, user: req.user._id });
  res.send({ message: "Order added!", order: addedOrder });
};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

export { addOrder, getOrders };
