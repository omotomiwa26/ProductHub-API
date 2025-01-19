const express = require('express');
const { addBook, listAllBooks, listBookById, updateBook, deleteBook } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/product', authMiddleware, addBook);
router.get('/product', authMiddleware, listAllBooks);
router.get('/product/:id', authMiddleware, listBookById);
router.put('/product/:id', authMiddleware, updateBook);
router.delete('/product/:id', authMiddleware, deleteBook);

module.exports = router;
