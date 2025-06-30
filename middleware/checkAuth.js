import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token) {
      return res.status(401).send({ error: "You must be loggedin!" });
    }
    const { _id } = jwt.verify(token, "mysecretkey");
    const user = await User.findById(_id);
    if (user) {
      req.user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      };
      next();
    }
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
};

export { checkAuth };
