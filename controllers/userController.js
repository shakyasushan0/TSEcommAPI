import User from "../models/userModel.js";
import { createUserSchema } from "../models/userModel.js";

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

export { signup };
