const formidable = require('formidable')
const _ = require('lodash')

const Product = require('../models/product')


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err) => {

    })
}