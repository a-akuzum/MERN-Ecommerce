const express = require('express')
const router = express.Router()

const {
    create
} = require("../controllers/category")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')


router.post("/category/create", create)



module.exports = router;