import { Router } from 'express'
import { getProducts } from '../controller/products'
const router = Router()

router.route('/').get(getProducts)

export default router
