const Controller = require("../controller/user");
const authRouter = require("./auth");
const postRouter = require("./post");
const userRouter = require("./user");

const router = require("express").Router();

router.get("/", Controller.welcome);
router.post("/file", Controller.image);

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
