import { Router } from 'express'
import { AddToCart, GetCart, RemoveFromCart } from '../controller/cart'
import authentication from '../middleware/authentication'

const router = Router()

// router.route('/').get(AddToCart)
router.route('/addtocart').post(authentication, AddToCart)
router.route('/getcart').get(authentication, GetCart)
router.route('/removefromcart').delete(authentication, RemoveFromCart)

export default router
