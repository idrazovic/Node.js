const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post(
    '/add-product',
    isAuth,
    body('title').isLength({ min: 3 }).trim().withMessage('Please enter a valid title.'),
    body('price').isFloat().withMessage('Please enter a valid price.'),
    body('description').isLength({ min: 5, max: 400 }).withMessage('Please enter a valid description.'),
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    isAuth,
    body('title').isLength({ min: 3 }).trim().withMessage('Please enter a valid title.'),
    body('price').isFloat().withMessage('Please enter a valid price.'),
    body('description').isLength({ min: 5, max: 400 }).withMessage('Please enter a valid description.'),
    adminController.postEditProduct);

router.delete('/products/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
