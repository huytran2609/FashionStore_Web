const router = require('express').Router();
const controllers = require('../controllers/order');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create', [verifyAccessToken], controllers.createOrder);
router.get('/', [verifyAccessToken, isAdmin], controllers.getOrders);
router.get('/userOrder', verifyAccessToken, controllers.getUserOrder);
router.get('/orderDetail/:oid', verifyAccessToken, controllers.getOrderDetail);
router.put('/status/:oid', [verifyAccessToken, isAdmin], controllers.updateStatusOrder);
router.delete('/cancel-order/:orderId', controllers.cancelUserOrder);
// router.delete('/:cpid', [verifyAccessToken, isAdmin], controllers.deleteCoupon);

module.exports = router;
