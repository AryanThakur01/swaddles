import { Router } from 'express'
import {
  getAllProducts,
  getOneProduct,
  getSearchedProduct,
} from '../controller/products'
const router = Router()

router.route('/').get(getAllProducts)
router.route('/search').get(getSearchedProduct)
router.route('/oneproduct').get(getOneProduct)

export default router
