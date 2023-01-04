const express = require("express");
const controller = require("../../../controllers/v1/post/postController");

const router = express.Router();


router.get("/list", controller.getPostList);
// router.get("/list/:id", controller.getPostDetail);

router.post("/create", controller.create);

module.exports = router;