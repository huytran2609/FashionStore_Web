const router = require('express').Router();
const controllers = require('../controllers/coupon');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create', [verifyAccessToken, isAdmin], controllers.createCoupon);
router.get('/', controllers.getCoupons);
router.put('/:cpid', [verifyAccessToken, isAdmin], controllers.updateCoupon);
router.delete('/:cpid', [verifyAccessToken, isAdmin], controllers.deleteCoupon);

module.exports = router;
