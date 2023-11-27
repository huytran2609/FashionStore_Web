const router = require('express').Router();
const controllers = require('../controllers/category');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create', [verifyAccessToken, isAdmin], controllers.createCategory);
router.get('/', controllers.getCategories);
router.put('/:cid', [verifyAccessToken, isAdmin], controllers.updateCategory);
router.delete('/:cid', [verifyAccessToken, isAdmin], controllers.deleteCategory);

module.exports = router;
