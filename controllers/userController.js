import User from "../models/userModel.js";
import { createUserSchema } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const signup = async (req, res) => {
  try {
    const user = req.body;
    const parsedUser = createUserSchema.parse(user);
    const foundUser = await User.findOne({ email: parsedUser.email });
    if (foundUser) {
      return res.status(400).send({ error: "User already exists!" });
    }

    const newUser = await User.create(parsedUser);
    res.send({ message: "User registered!", user: newUser });
  } catch (err) {
    res.status(400).send({ error: err.errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "User not registered" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = createToken(user._id);
    res.cookie("jwt", token);
    res.send({ message: "Login Success", token });
  } else {
    res.status(400).send({ error: "Invalid Password" });
  }
};
export { signup, login };
