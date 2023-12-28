const router = require('express').Router();
const controllers = require('../controllers/user');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/current', verifyAccessToken, controllers.getCurrent);
router.post('/refreshToken', controllers.refreshAccessToken);
router.get('/logout', controllers.logout);
// router.get('/', [verifyAccessToken, isAdmin], controllers.getUsers);
router.get('/', controllers.getUsers);
router.put('/current', [verifyAccessToken], controllers.updateUser);
router.put('/address', verifyAccessToken, controllers.updateUserAddress);
router.put('/cart', verifyAccessToken, controllers.updateCart);
router.put('/:uid', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin);
router.delete('/removeCart/:pid/:color?', [verifyAccessToken], controllers.removeProductFromCart);
router.delete('/:uid', [verifyAccessToken, isAdmin], controllers.deleteUser);

module.exports = router;
