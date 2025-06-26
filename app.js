import express from "express";
import connectDB from "./db/index.js";

import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRotuer.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

connectDB().then(() =>
  app.listen(3000, () => console.log(`Server running on http://localhost:3000`))
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// http://localhost:3000/api/products
app.use(errorHandler);
