const {Router} = require('express')
const {getClinicByMail,addClinic} = require('../controllers/superAdminController')

const superAdminRouter = new Router()

superAdminRouter.get('/:email', getClinicByMail)
superAdminRouter.post('/addClinic', addClinic)



module.exports = superAdminRouter