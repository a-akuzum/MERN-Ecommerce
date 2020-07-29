const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
const {errorHandler} = require('../helpers/db-ErrorHandler')

// this method to seach product by id
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
    if(err || !product){
        return res.status(400).json({
            error: 'Product not found'
        })
    }
    req.product = product
    next();
    })
}

//this method to read product but not photo cuz photo size 
exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        
        // check for all fields
        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }
        
        let product = new Product(fields)
        
        //photo validation
        // 1kb = 1000
        // 1mb = 1000000
        if(files.photo){
            // console.log("FILES PHOTO: ", files.photo)
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image size should be less than 1Mb'
                })
            }
            
            product.photo.data = fs.readFileSync(files.photo.path) //fs = filesystem
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Product has been deleted successfully"
        })

    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        
        // check for all fields
        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }
        
        let product = req.product
        product = _.extend(product, fields)
        
        //photo validation
        // 1kb = 1000
        // 1mb = 1000000
        if(files.photo){
            // console.log("FILES PHOTO: ", files.photo)
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image size should be less than 1Mb'
                })
            }
            
            product.photo.data = fs.readFileSync(files.photo.path) //fs = filesystem
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}


// QUERIES
// sell / arrivals
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
//if no params are sent, then all products are returned

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select("-photo") //deselect
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: "Product not found"    
                })
            }
            res.json(products)
        })
}

//it will find the products based on the req product category
//other products that has the same category, will be returned
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    //$ne: not included on mongodb, so this will only return related product not actual product
    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products)
        })

}