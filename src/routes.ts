import { Router } from "express"
import * as productController from "./controllers/products-controller"

const router = Router()

router.get('/products/', productController.getProductsList)
router.post('/products/', productController.postProduct)
router.get('/products/:id', productController.getProductById)
router.patch('/products{/:id}', productController.updateProductById)
router.delete('/products{/:id}', productController.deleteProduct)

export default router;