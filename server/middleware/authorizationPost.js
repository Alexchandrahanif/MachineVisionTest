const { Post } = require("../models/index");

const Authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.user.id;
    const dataPost = await Post.findByPk(id);

    if (dataPost.UserId !== UserId) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authorization;
