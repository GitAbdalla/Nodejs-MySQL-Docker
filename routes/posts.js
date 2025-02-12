const express = require("express");
const postsController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadImageMiddlware')
const {
  createPostValidation,
  updatePostValidation,
  getPostValidation,
  deletePostValidation,
  validate,
} = require("../validation/postValidator");

const router = express.Router();

router.post(
  "/",
  authMiddleware.checkAuth,
  upload.single('image'),
  createPostValidation,
  validate,
  postsController.createPost
);
router.get("/", postsController.getAllPosts);
router.get("/:id", getPostValidation, validate, postsController.getPostById);
router.put(
  "/:id",
  authMiddleware.checkAuth,
  updatePostValidation,
  validate,
  postsController.updatePost
);
router.delete(
  "/:id",
  authMiddleware.checkAuth,
  deletePostValidation,
  validate,
  postsController.deletePost
);

module.exports = router;
