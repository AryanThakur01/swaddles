import { Router } from 'express'
import { register, login, testAuth } from '../controller/auth'
const router = Router()

router.route('/').get(testAuth)
router.route('/register').post(register)
router.route('/login').post(login)

export default router
