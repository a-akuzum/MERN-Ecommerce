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
        let product = new Product(fields)

        // check for all fields
        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }
        
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

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let product = new Product(fields)

        // check for all fields
        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }
        
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