const {Router} = require('express')

const {logIn,signUp,logOut} = require('../controllers/userController')

const userRouter = new Router()

// userRouter.post('/clinicLogin',clinicLogIn)
userRouter.post('/login',logIn)
userRouter.post('/signup',signUp)
userRouter.post('/logout',logOut)

module.exports = userRouter
