const Controller = require("../controller/post");
const authentication = require("../middleware/authentication");

const postRouter = require("express").Router();

postRouter.get("/", authentication, Controller.getPosts);
postRouter.get("/:id", authentication, Controller.getPost);
postRouter.get("/user/:id", authentication, Controller.getPostByUserId);
postRouter.post("/", authentication, Controller.createPost);
postRouter.put("/:id", authentication, Controller.editPost);
postRouter.delete("/:id", authentication, Controller.deletePost);
postRouter.put("/like/:id", authentication, Controller.like);
postRouter.put("/unlike/:id", authentication, Controller.unlike);

module.exports = postRouter;
