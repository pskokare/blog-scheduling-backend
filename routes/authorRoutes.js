const express = require('express');
const router = express.Router();
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');
const upload = require('../middleware/upload');

// Author routes
router.post('/', 
  upload.single('profilepicture'), 
  createAuthor
);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
