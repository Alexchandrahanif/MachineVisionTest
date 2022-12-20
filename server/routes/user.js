const userRouter = require("express").Router();

const Controller = require("../controller/user");

userRouter.get("/", Controller.getUsers);
userRouter.get("/:id", Controller.getUser);
userRouter.put("/:id", Controller.editUser);
userRouter.delete("/:id", Controller.deleteUser);
userRouter.patch("/:id", Controller.changePassword);

module.exports = userRouter;
