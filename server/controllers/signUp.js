const jwt = require("jsonwebtoken");
const { User, validationNewUser } = require("../models/User");

//create new token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const signUpUser = async (req, res) => {
  /********************* FIRST METHODE ******************/

  const { error } = validationNewUser.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { firstName, lastName, birthday, email, password, gender } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      birthday,
      email,
      password,
      gender
    );

    //create token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser };
