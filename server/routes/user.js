const express = require("express");
const router = express();

const { User } = require("../models/User");

/**
 * @Desc Get all users
 * @method GET
 * @route /api/user
 * @Access Private
 */

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/**
 * @Desc Get by id
 * @method GET
 * @route /api/user
 * @Access Private
 */

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "User Not Found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
