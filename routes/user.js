const express = require('express')
const router = express.Router()
const { userById } = require("../controllers/user")
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

//user able to see the profile and update the profile - no need to be admin
router.get('/user/:userId',requireSignin, isAuth, read)
router.put('/user/:userId',requireSignin, isAuth, update)

router.param('userId', userById)


module.exports = router;