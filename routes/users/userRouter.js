const express = require('express')
const router = express.Router()
const { createUser, login } = require('./controller/userController')
const { validateCreateData, checkIsEmpty, validateLoginData, checkIsUndefined} = require('./lib/index')
const { jwtMiddleware } = require('./lib/shared/jwtMiddleware')

router.post('/create-user', checkIsUndefined, checkIsEmpty, validateCreateData,  createUser)
router.get('/login', checkIsUndefined, checkIsEmpty, validateLoginData, login)


module.exports = router