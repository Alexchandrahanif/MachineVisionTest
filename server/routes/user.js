const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);
userRouter.post("/login", Controller.login);

module.exports = userRouter;
