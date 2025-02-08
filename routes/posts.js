const express = require('express');
const postsController = require('../controllers/post.controller');
const {
    createPostValidation,
    updatePostValidation,
    getPostValidation,
    deletePostValidation,
    validate,
  } = require('../validation/postValidator');

const router=  express.Router();

router.post('/', createPostValidation , validate, postsController.createPost);
router.get('/' ,postsController.getAllPosts);
router.get('/:id' ,getPostValidation , validate,postsController.getPostById);
router.put('/:id', updatePostValidation ,validate ,postsController.updatePost);
router.delete('/:id', deletePostValidation ,validate,postsController.deletePost)


module.exports = router;