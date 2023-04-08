const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../controllers/userController')

const verifyToken = (req, res, next) => {
  //1)Get token from Cookie by cookie-parser
  const token = req.cookies.jwt

  //2) Validate the token
  if (token) {
    try {
      const userPayload = jwt.verify(token,process.env.SECRET_KEY)
      req.userPayload = userPayload
      next()
    } catch (error) {
      res.status(400).send({ status: 'error', msg: 'Token Invalid' })
    }
  } else {
    res.status(400).send({ status: 'error', msg: 'Token Not found' })
  }
}

  const isDoctor = (req, res, next) => {
    //if Admin, next()
    //else not authorized to perform this operation
    const userPayload = req.userPayload
  
    if (userPayload.isDoctor) {
      next()
    } else {
      res.status(401).send({ status: 'error', msg: 'Not authorized to perform this operation' })
    }
  
  }
 

  module.exports = {
    verifyToken,
    isDoctor
   
  }


