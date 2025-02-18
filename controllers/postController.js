const models = require("../models");
const {
  applySearch,
  applyFilters,
  applyPagination,
} = require("../utils/apiFeatures");

exports.createPost = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await models.Post.create({
      title,
      content,
      imageUrl,
      categoryId,
      userId,
    });
    res.status(201).json({
      message: "Post created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, ...filters } = req.query;

    const query = {
      where: {},
      include: [
        { model: models.User, attributes: ["id", "name"] },
        { model: models.Category, attributes: ["id", "name"] },
      ],
    };

    applySearch(query, search, ["title", "content"]);
    applyFilters(query, filters);
    applyPagination(query, page, limit);

    const { rows: posts, count } = await models.Post.findAndCountAll(query);

    res.status(200).json({
      results:posts.length,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await models.Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post fetched successully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await models.Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const updatePost = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
    };
    const userId = 1;

    await models.Post.update(updatePost, {
      where: { id: postId, userId: userId },
    });
    const updatedPost = await models.Post.findByPk(postId);

    res.status(200).json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    await post.destroy();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
