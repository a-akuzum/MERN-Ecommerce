const Category = require('../models/category')
const {errorHandler} = require('../helpers/db-ErrorHandler')

// this method to grab single category on routes
exports.categoryById = (res, req, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        req.category = category
        next();
    })
}

//this method to create category or product on routes
exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err){
            return req.status(400).json({
                error: errorHandler(err)
            })
        }
        
        res.json({ data })
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}