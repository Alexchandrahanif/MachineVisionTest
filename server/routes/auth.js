const Controller = require("../controller/user");
const upload = require("../middleware/multer");

const authRouter = require("express").Router();

authRouter.post("/register", upload.single("photo"), Controller.register);
authRouter.post("/login", Controller.login);
authRouter.post("/logout", Controller.logout);

module.exports = authRouter;
