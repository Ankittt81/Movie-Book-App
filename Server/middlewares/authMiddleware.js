const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, "movies-booking");
    req.body = verifiedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Token Invalid",
    });
  }
};
