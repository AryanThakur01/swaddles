import { Router } from 'express'
import { getAllHomePageData } from '../controller/suggested'

const router = Router()

router.route('/').get(getAllHomePageData)

export default router
