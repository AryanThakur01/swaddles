import { Router } from 'express'
import {
  getAllProducts,
  getFilters,
  getHomePageProducts,
  getMyOrders,
  getOneProduct,
  getProductList,
  getSearchedProduct,
} from '../controller/products'
import authentication from '../middleware/authentication'
const router = Router()

router.route('/').get(getAllProducts)
router.route('/search').get(getSearchedProduct)
router.route('/oneproduct').get(getOneProduct)
router.route('/getfilters').get(getFilters)
router.route('/getproductlist').get(getProductList)
router.route('/gethomeproducts').get(getHomePageProducts)
router.route('/getMyOrders').get(authentication, getMyOrders)

export default router
