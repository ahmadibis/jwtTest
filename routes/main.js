const { login, dashboard } = require('../controllers/main')
//add the middleware first so unless they are legit then 
const authenticationMiddleware = require('../middleware/auth')

const router = require('express').Router()

//user can access the dashboard
router.route("/dashboard").get( authenticationMiddleware, dashboard)
router.route("/login").post(login)




module.exports = router