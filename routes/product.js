const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")

const { create, productById, read } = require("../controllers/product")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')



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

router.param('userId', userById)
router.param('productId', productById)


module.exports = router;