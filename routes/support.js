const express = require("express");
const Support = require("../models/support");
const auth = require("../middlewares/auth");

const supportRouter = express.Router();

// Create a new support user
supportRouter.post("/api/support", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingSupport = await Support.findOne({ email });
    if (existingSupport) {
      return res
        .status(400)
        .json({ msg: "Support user with the same email already exists" });
    }

    const support = new Support({
      name,
      email,
      password,
    });

    await support.save();

    res.json(support);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all support users
supportRouter.get("/api/support", auth, async (req, res) => {
  try {
    const supportUsers = await Support.find();
    res.json(supportUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = supportRouter;
