const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")

const { create, categoryById, read } = require("../controllers/category")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')

router.get('/category/:categoryId', read)
router.post(
    "/category/create/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    create) // create method on category.js on controller
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    update) 

router.param('categoryId', categoryById) //categoryById middleware on controller
router.param('userId', userById)


module.exports = router;