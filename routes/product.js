const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")

const { create } = require("../controllers/product")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')


router.post(
    "/product/create/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    create)

router.param('userId', userById)


module.exports = router;