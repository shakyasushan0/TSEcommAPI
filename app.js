import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRotuer.js";
import uploadRouter from "./routes/uploadRouter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB().then(() =>
  app.listen(3000, () => console.log(`Server running on http://localhost:3000`))
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/image", uploadRouter);

// http://localhost:3000/api/products
app.use(errorHandler);
