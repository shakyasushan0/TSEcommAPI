import jwt from "jsonwebtoken";

const createToken = (_id) =>
  jwt.sign({ _id }, "mysecretkey", { expiresIn: "3d" });

export default createToken;
