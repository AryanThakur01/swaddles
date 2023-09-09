import { Router } from 'express'
import authentication from '../middleware/authentication'
import { checkoutUser, saveOrder } from '../controller/checkout'
const router = Router()

router.route('/').post(authentication, checkoutUser)
router.route('/save').post(authentication, saveOrder)

export default router
