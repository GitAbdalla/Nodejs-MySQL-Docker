const models= require("../models");

exports.createPost = async (req, res) => {
  try {
    const { title, content, imageUrl, categoryId } = req.body;
    const userId = 1;

    const result = await Post.create({
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
    const posts = await models.Post.findAll();
    res.status(200).json({
      message: "Posts fetched successfully",
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
    title : req.body.title,
    content : req.body.content,
    imageUrl : req.body.imageUrl,
    categoryId : req.body.categoryId,
   }
   const userId = 1;
    

    await models.Post.update(updatePost, {where:{id:postId, userId:userId}})
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
