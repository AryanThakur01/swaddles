import { Router } from 'express'
import { AddToCart, GetCart } from '../controller/cart'
import authentication from '../middleware/authentication'

const router = Router()

// router.route('/').get(AddToCart)
router.route('/addtocart').post(authentication, AddToCart)
router.route('/getCart').get(authentication, GetCart)

export default router