const { Post, User } = require("../models/index");
const { Op } = require("sequelize");

class Controller {
  // GET POSTS
  static async getPosts(req, res, next) {
    try {
      let pagination = {
        limit: 8,
        include: {
          model: User,
          attributes: {
            exclude: "password",
          },
        },
      };
      let { page } = req.query;
      if (page) {
        pagination.offset = (page - 1) * 8;
      }
      let { search } = req.query;
      if (search) {
        pagination = {
          where: {
            caption: {
              [Op.iLike]: `%${search}%`,
            },
          },
        };
      }
      if (search) {
        pagination = {
          where: {
            tags: {
              [Op.iLike]: `%${search}%`,
            },
          },
        };
      }

      let dataPost = await Post.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataPost.count / 8);
      res.status(200).json({
        statusCode: 200,
        data: dataPost.rows,
        pagination: {
          total: dataPost.count,
          page: totalPage,
          limit: 8,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //GET POST BY ID
  static async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      res.status(200).json({
        data: dataPost,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE POST // Done
  static async createPost(req, res, next) {
    try {
      const { id } = req.user;
      const { caption, tags, image } = req.body;
      const dataPost = await Post.create({
        caption,
        tags,
        likes: 0,
        image,
        UserId: id,
      });

      const dataUser = await User.findByPk(id);

      res.status(201).json({
        success: true,
        message: "Successfully Create Post",
        data: {
          image: dataPost.image,
          caption: dataPost.caption,
          tags: dataPost.tags,
          likes: dataPost.likes,
          createdAt: dataPost.createdAt,
          updatedAt: dataPost.updatedAt,
          user: {
            name: dataUser.name,
            username: dataUser.username,
            email: dataUser.email,
            photo: dataUser.photo,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // EDIT POST
  static async editPost(req, res, next) {
    try {
      const idU = req.user.id;
      const { id } = req.params;
      const { caption, tags, image } = req.body;
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      const data = await Post.update(
        {
          caption,
          tags,
          image,
        },
        {
          where: {
            id,
          },
        }
      );

      const dataUser = await User.findByPk(idU);

      res.status(201).json({
        success: true,
        message: "Successfully Create Post",
        data: {
          image: dataPost.image,
          caption: dataPost.caption,
          tags: dataPost.tags,
          likes: dataPost.likes,
          createdAt: dataPost.createdAt,
          updatedAt: dataPost.updatedAt,
          user: {
            name: dataUser.name,
            username: dataUser.username,
            email: dataUser.email,
            photo: dataUser.photo,
          },
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DELETE POST
  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      const data = await Post.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        success: true,
        message: `Successfullly Delete Post`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // LIKE
  static async like(req, res, next) {
    try {
      const { id } = req.params;
      const { likes } = req.query;

      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      if (likes === "like") {
        Post.increment(
          {
            likes: 1,
          },
          {
            where: {
              id,
            },
          }
        );
      }
      res.status(200).json({
        status: true,
        message: "",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
  // UNLIKE
  static async unlike(req, res, next) {
    try {
      const { id } = req.params;
      const { likes } = req.query;

      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      if (likes === "dislike") {
        Post.decrement(
          {
            likes: 1,
          },
          {
            where: {
              id,
            },
          }
        );
      }
      res.status(200).json({
        status: true,
        message: "",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
