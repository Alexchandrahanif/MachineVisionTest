const Controller = require("../controller/user");

const authRouter = require("express").Router();

authRouter.post("/register", Controller.register);
authRouter.post("/login", Controller.login);
authRouter.post("/logout", Controller.logout);

module.exports = authRouter;
