const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/authcheck')
const dashboard_controller = require('../controllers/dashboard');

//router.get('/', dashboard_controller.myPostInDashboard)

router.get('/update', ensureAuth, dashboard_controller.checkmeupdate)

router.post('/updateAUser',  dashboard_controller.updateMe)

router.get('/posts', ensureAuth, dashboard_controller.takeMeposts)

router.post('/createpost', dashboard_controller.makePost )

module.exports = router