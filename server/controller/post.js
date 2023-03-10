const { Post, User, UserLiked } = require("../models/index");
const { Op } = require("sequelize");

const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;

class Controller {
  // GET POSTS
  static async getPosts(req, res, next) {
    try {
      let pagination = {
        limit: 8,
        order: [["id", "ASC"]],
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
        pagination.where = {
          tags: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      let postTags = await Post.findAndCountAll(pagination);

      if (search) {
        pagination.where = {
          caption: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      let postCaption = await Post.findAndCountAll(pagination);

      let dataPost = {};
      if (search) {
        dataPost.rows = [...postCaption.rows, ...postTags.rows];
        dataPost.count = postCaption.count + postTags.count;
      } else {
        dataPost = await Post.findAndCountAll(pagination);
      }
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
      next(error);
    }
  }

  //GET POST BY ID
  static async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const dataPost = await Post.findOne({
        where: {
          id,
        },
        include: {
          model: User,
          attributes: {
            exclude: "password",
          },
        },
      });
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }
      res.status(200).json({
        success: true,
        message: "Successfully Get Post",
        data: dataPost,
      });
    } catch (error) {
      next(error);
    }
  }

  //GET POST BY USER ID
  static async getPostByUserId(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      let pagination = {
        limit: 8,
        order: [["id", "ASC"]],
        include: {
          model: User,
          attributes: {
            exclude: "password",
          },
        },
        where: {
          UserId: id,
        },
      };
      let { page } = req.query;
      if (page) {
        pagination.offset = (page - 1) * 8;
      }
      let { search } = req.query;
      if (search) {
        pagination.where = {
          tags: {
            [Op.iLike]: `%${search}%`,
          },

          UserId: id,
        };
      }
      let postTags = await Post.findAndCountAll(pagination);

      if (search) {
        pagination.where = {
          caption: {
            [Op.iLike]: `%${search}%`,
          },
          UserId: id,
        };
      }
      let postCaption = await Post.findAndCountAll(pagination);

      let dataPost = {};
      if (search) {
        dataPost.rows = [...postCaption.rows, ...postTags.rows];
        dataPost.count = postCaption.count + postTags.count;
      } else {
        dataPost = await Post.findAndCountAll(pagination);
      }
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
      next(error);
    }
  }

  // CREATE POST // Done
  static async createPost(req, res, next) {
    try {
      const { id } = req.user;
      const { caption, tags } = req.body;
      if (!req.file) {
        throw { name: "Uploaded Image is required" };
      }

      let uploadedFile = UploadApiResponse;

      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploadFoto",
        resource_type: "auto",
      });
      const { secure_url } = uploadedFile;
      const dataPost = await Post.create({
        caption,
        tags,
        likes: 0,
        image: secure_url,
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
      console.log(req.body);
      let imageUrl = image;

      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }

      if (dataPost.image !== image) {
        if (!req.file) {
          throw { name: "Uploaded Image is required" };
        }
        let uploadedFile = UploadApiResponse;

        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "uploadFoto",
          resource_type: "auto",
        });
        const { secure_url } = uploadedFile;
        imageUrl = secure_url;
      }

      const data = await Post.update(
        {
          caption,
          tags,
          image: imageUrl,
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
          image: imageUrl,
          caption: caption,
          tags: tags,
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
      const { id } = req.params; // id postingan yg mau di like
      const { likes } = req.query; // validasi untuk query like
      const UserId = req.user.id; // id user yg login

      // validasi untuk postingan yg mau di like, ada atau tidak
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }

      // validasi sebelum like 2x
      const dataLike = await UserLiked.findOne({
        where: {
          PostId: id,
          UserId: UserId,
        },
      });
      // tidak bisa like 2x
      if (dataLike) {
        throw { name: "can't like because already liked" };
      }

      // validasi untuk menambahkan jumlah like
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
      } else {
        // kalau query  nya salah
        throw { name: "Like/Unlike Failed" };
      }
      // menambahkan di tabel konjungsi
      const data = await UserLiked.create({
        PostId: id,
        UserId: UserId,
      });

      res.status(200).json({
        status: true,
        message: "Successfully Like Post",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
  // UNLIKE
  static async unlike(req, res, next) {
    try {
      const { id } = req.params; // id postingan yg mau di like
      const { likes } = req.query; // untuk menentukan di like atau tidak
      const UserId = req.user.id; // Id User yg login/ mau like post

      //Validasi postingan nya ada atau tidak
      const dataPost = await Post.findByPk(id);
      if (!dataPost) {
        throw { name: "Data Post Not Found", id: id };
      }

      // untuk cek dahulu udah unlike apa belum
      const dataLike = await UserLiked.findOne({
        where: {
          PostId: id,
          UserId: UserId,
        },
      });
      // setelah di cek, kondisi supaya tidak bisa di unlike 2x
      if (!dataLike) {
        throw { name: "can't dislike because it hasn't been liked" };
      }

      // Proses mengurangi like
      if (likes === "unlike") {
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
      } else {
        throw { name: "Like/Unlike Failed" };
      }

      // menghapus data di tabel kojungsi
      const data = await UserLiked.destroy({
        where: {
          UserId: UserId,
          PostId: id,
        },
      });
      res.status(200).json({
        status: true,
        message: "Successfully Unlike Post",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllLike(req, res, next) {
    try {
      const { id } = req.user;
      const data = await UserLiked.findAll({
        where: {
          UserId: id,
        },
        attributes: {
          exclude: ["UserId", "createdAt", "updatedAt", "id"],
        },
      });
      const data2 = data.map((el) => {
        return el.PostId;
      });
      res.status(200).json({
        success: true,
        data: data2,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
