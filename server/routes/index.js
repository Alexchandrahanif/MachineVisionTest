const Controller = require("../controller/user");
const authentication = require("../middleware/authentication");
const authRouter = require("./auth");
const postRouter = require("./post");
const userRouter = require("./user");

const upload = require("../middleware/multer");

const router = require("express").Router();

router.get("/", Controller.welcome);
router.post("/file", authentication, upload.single("file"), Controller.image);

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
