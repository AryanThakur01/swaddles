import { Router } from 'express'
import {
  getAllProducts,
  getFilters,
  getHomePageProducts,
  getOneProduct,
  getProductList,
  getSearchedProduct,
} from '../controller/products'
const router = Router()

router.route('/').get(getAllProducts)
router.route('/search').get(getSearchedProduct)
router.route('/oneproduct').get(getOneProduct)
router.route('/getfilters').get(getFilters)
router.route('/getproductlist').get(getProductList)
router.route('/gethomeproducts').get(getHomePageProducts)

export default router
