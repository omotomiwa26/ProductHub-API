const express = require('express');
const { addProduct, listAllProducts, listProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/product', authMiddleware, addProduct);
router.get('/product', authMiddleware, listAllProducts);
router.get('/product/:id', authMiddleware, listProductById);
router.put('/product/:id', authMiddleware, updateProduct);
router.delete('/product/:id', authMiddleware, deleteProduct);

module.exports = router;
