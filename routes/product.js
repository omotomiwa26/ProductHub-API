const express = require('express');
const { addBook, listAllBooks, listBookById, updateBook, deleteBook } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authMiddleware, addBook);
router.get('/book', authMiddleware, listAllBooks);
router.get('/book/:id', authMiddleware, listBookById);
router.put('/book/:id', authMiddleware, updateBook);
router.delete('/book/:id', authMiddleware, deleteBook);

module.exports = router;
