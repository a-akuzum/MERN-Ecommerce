const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")

const { create, categoryById, read, update, remove, list } = require("../controllers/category")
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
    update) //update method on category.js on controller
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    remove) //remove method on category.js on controller
router.get('/categories', list) // to list all categories



router.param('categoryId', categoryById) //categoryById middleware on controller
router.param('userId', userById)


module.exports = router;