const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);
userRouter.post("/login", Controller.login);

userRouter.get("/", Controller.getUsers);
userRouter.get("/:id", Controller.getUser);
userRouter.put("/:id", Controller.editUser);
userRouter.delete("/:id", Controller.deleteUser);
userRouter.patch("/:id", Controller.changePassword);

module.exports = userRouter;
