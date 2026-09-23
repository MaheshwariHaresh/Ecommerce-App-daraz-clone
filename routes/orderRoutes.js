import {Router} from 'express'
import {requireSignIn} from '../middlewares/authMiddleware.js'
import {createOrderController, confirmOrderController, getMyOrdersController, getOrderByIdController} from '../controllers/orderController.js'

const router = Router()

// CREATE ORDER
router.post('/create-order', requireSignIn, createOrderController)

// CONFIRM ORDER
router.put('/confirm-order/:id', requireSignIn, confirmOrderController)

// GET ALL ORDERS
router.get('/my-orders', requireSignIn, getMyOrdersController)

// GET ORDER BY ID 
router.get('/:id', requireSignIn, getOrderByIdController)

export default router