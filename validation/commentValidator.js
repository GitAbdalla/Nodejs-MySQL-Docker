const { body, validationResult } = require('express-validator');
const models = require('../models');

exports.createCommentValidation = [
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 3 }).withMessage('Content must be at least 3 characters long'),

  body('postId')
    .notEmpty().withMessage('Post ID is required')
    .isInt().withMessage('Post ID must be an integer')
    .custom(async (value) => {
      const post = await models.Post.findByPk(value);
      if (!post) {
        return Promise.reject('Post not found');
      }
    }),
];
exports.updateCommentValidation =[
    body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 3 }).withMessage('Content must be at least 3 characters long'),

]

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
