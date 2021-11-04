import express from 'express'
const router = express.Router()
import {getProducts,getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/productControllers.js'
import {protect, admin} from '../middleware/authMiddleware.js'


// Fetch all products
//GET /api/products
// create product <- admin
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

// Fetch single product
// GET /api/products/:id
router.route('/:id')
    .get(getProductById)
    .delete(protect,admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router

