const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')
const { 
    create, 
    productById, 
    read, 
    remove, 
    update, 
    list } = require("../controllers/product")



router.get('/product/:productId', read)
router.post(
    "/product/create/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    create)
router.delete(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin, 
    remove)
router.put(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin, 
    update)


router.get('/products', list)


router.param('userId', userById)
router.param('productId', productById)


module.exports = router;