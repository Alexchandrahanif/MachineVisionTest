const Controller = require("../controller/post");
const authentication = require("../middleware/authentication");

const postRouter = require("express").Router();

postRouter.get("/", Controller.getPosts);
postRouter.get("/:id", Controller.getPost);
postRouter.post("/", authentication, Controller.createPost);
postRouter.put("/:id", authentication, Controller.editPost);
postRouter.delete("/:id", Controller.deletePost);
postRouter.put("/like/:id", Controller.like);
postRouter.put("/unlike/:id", Controller.unlike);

module.exports = postRouter;
