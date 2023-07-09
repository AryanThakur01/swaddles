import { Router } from 'express'
import { updateMyData } from '../controller/userData'
import authentication from '../middleware/authentication'
const router = Router()

router.route('/update').put(authentication, updateMyData)

export default router
