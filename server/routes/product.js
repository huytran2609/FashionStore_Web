const router = require('express').Router();
const controllers = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/create', [verifyAccessToken, isAdmin], uploader.fields([
    { name: 'images', maxCount: 10 },
    { name: 'thumbnail', maxCount: 1 },
]) ,controllers.createProduct);
router.put('/ratings', verifyAccessToken, controllers.ratings);
// Get all products with filtering, sorting, and pagination
// Use query params: ?category=Women&limit=20&page=1&sort=-createdAt
router.get('/', controllers.getProducts);
router.put('/upload/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), controllers.uploadImagesProduct);
router.get('/:pid', controllers.getProduct);
router.put('/update/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct);

module.exports = router;
