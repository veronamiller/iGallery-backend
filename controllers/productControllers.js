import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products
//GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//get product by id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//delete a product
// DELETE /api/products/:id <- admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// create a product
// POST /api/products <-admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        artist: 'Sample Artist',
        year: 0,
        technique: 'Sample Technique',
        description: 'Sample Description',
        countInStock: 0
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// update a product
// PUT /api/products/:id <-admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, 
        price, 
        description, 
        image,
        year,
        artist,
        technique,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price,
        product.description = description
        product.image = image
        product.year = year
        product.artist = artist
        product.technique = technique
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})
export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}