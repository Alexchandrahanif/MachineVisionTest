const Controller = require("../controller/user");
const postRouter = require("./post");
const userRouter = require("./user");

const router = require("express").Router();

router.get("/", Controller.welcome);

router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
