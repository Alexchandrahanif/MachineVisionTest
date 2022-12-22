const userRouter = require("express").Router();
const upload = require("../middleware/multer");

const Controller = require("../controller/user");
const authentication = require("../middleware/authentication");

userRouter.get("/", authentication, Controller.getUsers);
userRouter.get("/:id", authentication, Controller.getUser);
userRouter.put(
  "/:id",
  authentication,
  upload.single("photo"),
  Controller.editUser
);
userRouter.delete("/:id", authentication, Controller.deleteUser);
userRouter.patch("/change-password", authentication, Controller.changePassword);

module.exports = userRouter;
