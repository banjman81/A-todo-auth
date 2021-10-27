const express = require('express')
const router = express.Router()

const {checkIsEmpty, checkIsUndefined} = require('../users/lib/index')
const { createTodo, allTodo } = require('./controller/todoController')
const { jwtMiddleware } = require('../users/lib/shared/jwtMiddleware')

router.get('/',jwtMiddleware, allTodo)
router.post('/create-task', jwtMiddleware , checkIsEmpty, createTodo)


module.exports = router