import Product from "../models/productModel.js";
import { createProductSchema } from "../models/productModel.js";

const getProducts = async (req, res) => {
  const category = req.query.category;
  if (category) {
    const product = await Product.find({ category });
    return res.send(product);
  }
  const product = await Product.find().populate("user", "fullname email -_id");
  res.send(product);
};

const addProduct = async (req, res) => {
  const product = req.body;
  try {
    const parsedProduct = createProductSchema.parse(product);
    const newProduct = await Product.create({
      ...parsedProduct,
      user: req.user._id,
    });
    res.send({
      message: "Product created!",
      product: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.errors });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).send({ error: "Product not found!" });
  }
  res.send({ message: "Product updated!", product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.send({ message: "Product deleted", product: deletedProduct });
};

export { getProducts, addProduct, updateProduct, deleteProduct };
