const { body, param, validationResult } = require('express-validator');
const models = require('../models'); 


exports.createPostValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters')
    .custom(async (value) => {
      const post = await models.Post.findOne({ where: { title: value } });
      if (post) {
        return Promise.reject('Title already exists');
      }
    }),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
  body('categoryId')
    .notEmpty().withMessage('Category ID is required')
    .isInt().withMessage('Category ID must be an integer'),
];


exports.updatePostValidation = [

  param('id')
    .notEmpty().withMessage('Post ID is required')
    .isInt().withMessage('Post ID must be an integer'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters')
    .custom(async (value, { req }) => {
      if (value) {
        const post = await models.Post.findOne({ where: { title: value } });
        if (post && post.id != req.params.id) {
          return Promise.reject('Title already exists');
        }
      }
    }),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
  body('categoryId')
    .optional()
    .isInt().withMessage('Category ID must be an integer'),
];


exports.getPostValidation = [
  param('id')
    .notEmpty().withMessage('Post ID is required')
    .isInt().withMessage('Post ID must be an integer'),
];

exports.deletePostValidation = [
  param('id')
    .notEmpty().withMessage('Post ID is required')
    .isInt().withMessage('Post ID must be an integer'),
];


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


