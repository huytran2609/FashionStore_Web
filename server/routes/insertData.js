const router = require('express').Router();
const controllers = require('../controllers/insertData');

router.post('/', controllers.insertProduct);
router.post('/category', controllers.insertCategory);

module.exports = router;
