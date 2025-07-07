import mongoose from "mongoose";
import { z } from "zod";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      minLength: [2, "name must have atleast 2 characters"],
    },
    description: String,
    price: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
    },
    image: String,
    countInStock: Number,
    category: String,
    brand: String,
    rating: {
      type: Number,
      max: 5,
      default: 0,
    },
    numReviews: Number,
  },
  { timestamps: true }
);

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must have atleast 2 characters"),
  description: z.string().optional(),
  price: z.number().min(1).max(100),
  rating: z.number().max(5).default(0),
  countInStock: z.number().default(0),
  image: z.string().default("/image/sample.jpg"),
  numReviews: z.number().optional(),
  brand: z.string(),
  category: z.enum(["electronics", "clothing"]),
});

const Product = mongoose.model("Product", productSchema);

export default Product;
