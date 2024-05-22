const express = require('express');

const { getAddProduct, getPostProduct } = require('../controllers/products');

const router = express.Router();

router.get('/add-product', getAddProduct);

router.post('/add-product', getPostProduct);

module.exports = router;
