const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const user = require('../controllers/user')
const frontend = require('../../../frontend/index')
const token = require('../controllers/token')


// AUTHENTICATION
router.get('/login', auth.authenticateAzure())

router.post('/auth/openid/callback', auth.authenticateAzureCallback())

router.get(`/auth/logout`, auth.logout())

// USER
router.get(`/user/profile`, auth.ensureAuthenticated(), user.getUserProfile())

// router.get('/',  frontend.firstPage())
router.get('/',  frontend.TeamsfirstPage())

// GET TOKEN FLOWS
router.get(`/token`, auth.ensureAuthenticated(), token.getToken())

router.get(`/tokenuser`, auth.ensureAuthenticated(), token.getTokenUser())

router.get(`/tokenbehalf`, auth.ensureAuthenticated(), token.getTokenOnBehalf())

router.get(`/tokenverify`, auth.ensureAuthenticated(), token.verifyToken())

router.get('/config', frontend.config())

router.get('/authtab', frontend.AuthTab())

router.get('/idlogin', auth.authidporten())

router.post('/idcallback', auth.idportencallback())


//router.get(`/scripts`, express.static('static'))


module.exports = router