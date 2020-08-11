const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
const {errorHandler} = require('../helpers/db-ErrorHandler')


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


        //photo validation
        // 1kb = 1000
        // 1mb = 1000000
        if(files.photo){
            // console.log("FILES PHOTO: ", files.photo)
            
            
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