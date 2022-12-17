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

  // Register User
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      const dataUser = await User.create({ email, password });

      res.status(201).json({
        id: dataUser.id,
        email: dataUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  // Login User
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
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get USer
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

  // Get User By Id
  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findByPk(id);
      if (!data) {
        throw { name: "Data User Not Found", id: id };
      }
      res.status(200).json({
        statusCode: 200,
        data: dataUser,
      });
    } catch (error) {
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
      const { id } = req.params;
      const { password, password1, password2 } = req.body;

      const dataUser = await User.findByPk(id);

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Invalid Password" };
      }

      if (password1 !== password2) {
        throw { name: "Password Not Match" };
      }

      const dataPassword = await User.update(
        {
          password: hashingPassword(password),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200),
        json({
          message: `Change password user with id ${id} successfullly`,
        });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
