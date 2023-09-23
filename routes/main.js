const express = require('express')
const {ensureAuth} = require('../middleware/authcheck')

const router = express.Router()
const path = require('path')
const home_controller = require('../controllers/home')
const auth_controller = require('../controllers/authcheck')



router.get('/', home_controller.getIndex)
router.get('/login', auth_controller.getlogin)
router.get('/signup', auth_controller.getsignup)
router.post('/createuser', auth_controller.checkSignupUser)
router.post('/login', auth_controller.loginCheck)
router.get('/dashboard', ensureAuth,  home_controller.checkuser)
router.get('/logout',  auth_controller.logout)

module.exports = router