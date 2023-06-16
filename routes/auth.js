const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();

//sign up route
authRouter.post("/api/signup", async (req, res) => {
  //get the data from the client
  try {
    const { name, email, password } = req.body;
    //post data in database

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with the same email already exists" });
    }

    const hashedhPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashedhPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sign in route

authRouter.post("/api/signin", (async) => {
  try {
    const { email, password } = req.body;
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
