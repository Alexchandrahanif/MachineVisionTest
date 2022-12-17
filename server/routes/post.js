const Controller = require("../controller/post");

const postRouter = require("express").Router();

postRouter.get("/", Controller.getPosts);
postRouter.get("/:id", Controller.getPost);
postRouter.post("/", Controller.createPost);
postRouter.put("/:id", Controller.editPost);
postRouter.delete("/:id", Controller.deletePost);
postRouter.patch("/:id", Controller.likes);
module.exports = postRouter;
