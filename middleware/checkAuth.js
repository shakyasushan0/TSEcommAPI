import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return res.status(401).send({ error: "You must be loggedin!" });
    }
    const { _id } = jwt.verify(token, "mysecretkey");
    console.log(_id);
    const user = await User.findById(_id);
    if (user) {
      console.log(user);
      req.user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      next();
    }
  } catch (err) {
    // console.log(err);
    res.status(400).send({ error: "Invalid Token" });
  }
};

const checkAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .send({ error: "You are not permitted to perform this operation" });
  }
};

export { checkAuth, checkAdmin };
