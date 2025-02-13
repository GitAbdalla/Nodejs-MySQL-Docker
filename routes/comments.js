const express = require('express');
const { createComment, getComments, getCommentById, updateComment, deleteComment } = require('../controllers/commentController');
const { createCommentValidation, validate, updateCommentValidation } = require('../validation/commentValidator');
const { checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', checkAuth ,createCommentValidation, validate, createComment);
router.get('/', getComments);
router.get('/:id', getCommentById);
router.put('/:id', checkAuth ,updateCommentValidation, validate, updateComment);
router.delete('/:id', checkAuth ,deleteComment);

module.exports = router;
