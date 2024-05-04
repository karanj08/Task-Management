import express from "express";
import User from "../models/user.Schema.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existinguser = await User.findOne({ username });
    const emailexists = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "username already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username should have atleast 4 characters" });
    }
    if (emailexists) {
      return res.status(300).json({ message: "email already exists" });
    }
    const haspassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: haspassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "signin successfully" });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
});

// login
router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  const existinguser = await User.findOne({ username });
  if (!existinguser) {
    return res.status(400).json({ message: "user does not exists" });
  }
  bcrypt.compare(password, existinguser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "karan") }];
      const token = jwt.sign({ authClaims }, "karan", { expiresIn: "2d" });
      res.status(200).json({ id: existinguser._id, token: token });
    } else {
      return res.status(400).json({ message: `INVALID CREDENTIAL => ${err}` });
    }
  });
});
export default router;
