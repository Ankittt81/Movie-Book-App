const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    // if not create the user acc to UserModel

    //hashing and salting
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.send({
        success: false,
        message: "user does not exist Please Register",
      });
    }

    //validate password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(validPassword);

    if (!validPassword) {
      res.status(401).send({
        success: false,
        message: "sorry Invalid Password Entered",
      });
    }

    const jwtToken = jwt.sign({ userId: user._id }, "movies-booking", {
      expiresIn: "2d",
    });

    res.send({
      success: true,
      message: "You've Successfully logged In",
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/get-valid-user", authMiddleware, async (req, res) => {
  const validuser = await User.findById(req.body.userId).select("-password");

  res.send({
    success: true,
    message: "You are authorized to go to the protected route!",
    data: validuser,
  });
});

module.exports = router;
