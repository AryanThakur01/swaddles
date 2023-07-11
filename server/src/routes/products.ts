import { Router } from 'express'
import { getAllProducts, getSearchedProduct } from '../controller/products'
const router = Router()

router.route('/').get(getAllProducts)
router.route('/search').get(getSearchedProduct)

export default router
