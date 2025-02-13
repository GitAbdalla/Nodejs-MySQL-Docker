const express = require("express");
const postsController = require("../controllers/postController");
// const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadImageMiddlware')
const {
  createPostValidation,
  updatePostValidation,
  getPostValidation,
  deletePostValidation,
  validate,
} = require("../validation/postValidator");
const { checkAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  checkAuth,
  upload.single('image'),
  createPostValidation,
  validate,
  postsController.createPost
);
router.get("/", postsController.getAllPosts);
router.get("/:id", getPostValidation, validate, postsController.getPostById);
router.put(
  "/:id",
  checkAuth,
  updatePostValidation,
  validate,
  postsController.updatePost
);
router.delete(
  "/:id",
  checkAuth,
  deletePostValidation,
  validate,
  postsController.deletePost
);

module.exports = router;
