const userRouter = require('./user');
const productRouter = require('./product');
const categoryRouter = require('./category');
const couponRouter = require('./coupon');
const orderRouter = require('./order');
const insertRouter = require('./insertData');
const { notFound, errHandler } = require('../middlewares/errHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/coupon', couponRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/insert', insertRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
