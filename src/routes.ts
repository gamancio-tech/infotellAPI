import { Router } from "express"
import * as productController from "./controllers/products-controller"

const router = Router()

router.get('/list', productController.getProductsList)

export default router;