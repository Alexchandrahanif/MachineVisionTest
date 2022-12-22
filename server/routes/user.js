const userRouter = require("express").Router();

const Controller = require("../controller/user");
const authentication = require("../middleware/authentication");

userRouter.get("/", authentication, Controller.getUsers);
userRouter.get("/:id", authentication, Controller.getUser);
userRouter.put("/:id", authentication, Controller.editUser);
userRouter.delete("/:id", authentication, Controller.deleteUser);
userRouter.patch("/change-password", authentication, Controller.changePassword);

module.exports = userRouter;
