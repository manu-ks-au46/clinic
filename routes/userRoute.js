const {Router} = require('express')

const {logIn,signUp,logOut} = require('../controllers/userController')

const userRouter = new Router()

userRouter.get('/login',logIn)
userRouter.get('/signup',signUp)
userRouter.get('/logout',logOut)

module.exports = userRouter
