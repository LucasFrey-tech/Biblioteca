import express from 'express';
import * as libroController from '../libros/libro.controller';

const router = express.Router();

router.get('/', libroController.getAllBooks);
router.get('/:id', libroController.getProductoById);
router.post('/', libroController.createBook);
router.put('/:id', libroController.updateBook);
router.delete('/:id', libroController.deleteBook);

export default router;

// ruta base = "/api/users"
// router.get('/:id', userController.getUserbyId);
// router.get('/:id/orders', userController.getUserOrders);
// router.get('/:id/orders/:orderId', userController.getUserOrderById);


// ruta base = "/api/orders"
// router.get('/', orderController.getOrders);
// router.get('/:id', orderController.getOrderById);