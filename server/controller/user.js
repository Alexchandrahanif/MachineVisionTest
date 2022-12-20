const {
  comparePassword,
  createAccessToken,
  hashingPassword,
} = require("../helper/helper");
const { User } = require("../models/index");

class Controller {
  //Welcome
  static async welcome(req, res, next) {
    try {
      res.status(200).json({
        message:
          "Welcome to API's Mechine Vision Indonesia Test by Alex Chadnra Hanif",
      });
    } catch (error) {
      next(error);
    }
  }

  // Register User //Done
  static async register(req, res, next) {
    try {
      let { name, username, email, password, photo } = req.body;
      const dataUser = await User.create({
        name,
        username,
        email,
        password,
        photo,
      });

      res.status(201).json({
        success: true,
        message: "Your account has been succesfully created",
        data: {
          name: dataUser.name,
          username: dataUser.username,
          email: dataUser.email,
          photo: dataUser.photo,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Login User //Done
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!dataUser) {
        throw { name: "Invalid email/password" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: dataUser.id,
      };

      const access_token = createAccessToken(payload);

      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: {
          token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout User //Done
  static async logout(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        message: "Successfully logout",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get User
  static async getUsers(req, res, next) {
    try {
      const dataUser = await User.findAll();
      res.status(200).json({
        statusCode: 200,
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get User By Id //Done
  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findByPk(id);
      if (!dataUser) {
        throw { name: "Data User Not Found", id: id };
      }
      res.status(200).json({
        success: true,
        message: "Successfully Get User",
        data: {
          name: dataUser.name,
          username: dataUser.username,
          email: dataUser.email,
          photo: dataUser.photo,
          createdAt: dataUser.createdAt,
          updatedAt: dataUser.updatedAt,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Edit User by Id
  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, username, email, photo } = req.body;

      const data = await User.findByPk(id);
      if (!data) {
        throw { name: "Data User Not Found", id: id };
      }
      const dataUser = await User.update(
        {
          name,
          username,
          email,
          photo,
        },
        {
          where: {
            id,
          },
        }
      );

      const dataBaru = await User.findByPk(id);
      res.status(200).json({
        success: true,
        message: "Successfully update User",
        data: {
          name: dataBaru.name,
          username: dataBaru.username,
          email: dataBaru.email,
          photo: dataBaru.photo,
          createdAt: dataBaru.createdAt,
          updatedAt: dataBaru.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete User by Id
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Delete User with id ${id} successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  // Change Password
  static async changePassword(req, res, next) {
    try {
      console.log("okeu");
      const { id } = req.params;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      console.log(id);
      console.log(req.body);

      const dataUser = await User.findByPk(id);
      console.log("sebelum komper");

      console.log(dataUser);
      if (!comparePassword(oldPassword, dataUser.password)) {
        throw { name: "Invalid Password" };
      }

      console.log("komper sukses");
      if (newPassword !== confirmNewPassword) {
        throw { name: "Password Not Match" };
      }

      const dataPassword = await User.update(
        {
          password: hashingPassword(newPassword),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        success: true,
        message: `Successfullly Change Password`,
        data: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //Upload image
  static async image(req, res, next) {
    try {
      const { file } = req.body;
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
