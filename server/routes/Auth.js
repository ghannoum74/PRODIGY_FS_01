const express = require("express");
const router = express();
const { validateOldUser, validationNewUser, User } = require("../models/User");
const { signUpUser } = require("../controllers/signUp");
const { loginUser } = require("../controllers/login");
const { updateUser } = require("../controllers/update");
const { verifyToken } = require("../middlewears/verifyToken");
/**
 * @Desc register new user
 * @method POST
 * @route /register
 * @Access Public
 */

router.post("/signup", signUpUser);

/**
 * @desc login User
 * @route /login
 * @method POST
 * @access public
 */

router.post("/login", loginUser);

/**
 * @desc update User
 * @route /update
 * @method PUT
 * @access public
 */

router.patch("/update/:id", verifyToken, updateUser);

module.exports = router;
