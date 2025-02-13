const models = require("../models");

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id;

    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await models.Comment.create({ content, postId, userId });

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await models.Comment.findAll({
      include: [
        { model: models.User, attributes: ["id", "name"] },
        { model: models.Post, attributes: ["id", "title"] },
      ],
    });

    res.status(200).json({message:"Comments fetched successfully",comments});
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await models.Comment.findByPk(id, {
      include: [
        { model: models.User, attributes: ["id", "name"] },
        { model: models.Post, attributes: ["id", "title"] },
      ],
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment fetched successfully", comment });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await models.Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await models.Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.destroy();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
