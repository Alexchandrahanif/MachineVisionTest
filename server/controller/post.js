const { Post } = require("../models/index");

class Controller {
  // GET POSTS
  static async getPosts(req, res, next) {
    try {
      const dataPost = await Post.findAll();
      res.status(200).json({
        data: dataPost,
      });
    } catch (error) {
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

  // CREATE POST
  static async createPost(req, res, next) {
    try {
      const { caption, tags, likes, image, UserId } = req.body;
      const dataPost = await Post.create({
        caption,
        tags,
        likes,
        image,
        UserId,
      });

      res.status(201).json({
        data: dataPost,
      });
    } catch (error) {
      next(error);
    }
  }

  // EDIT POST
  static async editPost(req, res, next) {
    try {
      const { id } = req.params;
      const { caption, tags, likes, image, UserId } = req.body;
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      const data = await Post.update(
        {
          caption,
          likes,
          tags,
          image,
          UserId,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: `Update post with id ${id} successfully`,
      });
    } catch (error) {
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
        message: `Delete post with id ${id} Successfullly`,
      });
    } catch (error) {
      next(error);
    }
  }

  // LIKE OR DISLIKE
  static async likes(res, res, next) {
    try {
      const { input } = req.body;

      const { id } = req.params;
      if (input === "like") {
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
      } else if (input === "dislike") {
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
        message: `Post with id ${input}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
