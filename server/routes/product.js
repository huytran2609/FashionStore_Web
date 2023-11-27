const router = require('express').Router();
const controllers = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/create', [verifyAccessToken, isAdmin], controllers.createProduct);
router.put('/ratings', verifyAccessToken, controllers.ratings);
router.get('/', controllers.getProducts);
router.put('/upload/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), controllers.uploadImagesProduct);
router.get('/:pid', controllers.getProduct);
router.put('/update/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct);

module.exports = router;
