const Controller = require("../controller/post");
const authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorizationPost");
const upload = require("../middleware/multer");

const postRouter = require("express").Router();

postRouter.get("/", authentication, Controller.getPosts);
postRouter.get("/userliked", authentication, Controller.findAllLike);
postRouter.get("/:id", authentication, Controller.getPost);
postRouter.get("/user/:id", authentication, Controller.getPostByUserId);
postRouter.post(
  "/",
  authentication,
  upload.single("image"),
  Controller.createPost
);
postRouter.put(
  "/:id",
  authentication,
  Authorization,
  upload.single("image"),

  Controller.editPost
);
postRouter.delete("/:id", authentication, Authorization, Controller.deletePost);
postRouter.put("/like/:id", authentication, Controller.like);
postRouter.put("/unlike/:id", authentication, Controller.unlike);

module.exports = postRouter;
