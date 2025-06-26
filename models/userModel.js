import mongoose from "mongoose";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const createUserSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("....");
    next();
  }
  console.log("Encrypting");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
