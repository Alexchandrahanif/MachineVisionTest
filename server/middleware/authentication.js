const { verifyAccessToken } = require("../helper/helper");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    // console.log(req.headers);
    console.log(access_token, "access");
    let payload = verifyAccessToken(access_token);
    let dataUser = await User.findByPk(payload.id);
    if (!dataUser) {
      throw { name: "Invalid access_token" };
    }
    req.user = {
      id: dataUser.id,
      email: dataUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
