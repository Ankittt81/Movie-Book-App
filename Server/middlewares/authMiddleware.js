const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Token Invalid",
    });
  }
};
