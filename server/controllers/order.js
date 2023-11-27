const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');
    const products = userCart?.cart?.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        color: item.color,
    }));
    let total = userCart?.cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const createdData = { products, totalPrice: total, orderBy: _id };
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon);
        total = Math.round((total * (1 - selectedCoupon?.discount / 100)) / 1000) * 1000;
        createdData.totalPrice = total;
        createdData.coupon = coupon;
    }
    const response = await Order.create(createdData);
    return res.status(200).json({
        success: response ? true : false,
        orders: response ? response : 'No orders found to create',
    });
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Status is required');
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedOrder: response ? response : 'Fail to update status',
    });
});

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id });
    return res.status(200).json({
        success: response ? true : false,
        userOrder: response ? response : 'Fail to get user order',
    });
});

const getOrders = asyncHandler(async (req, res) => {
    const response = await Order.find();
    return res.status(200).json({
        success: response ? true : false,
        userOrder: response ? response : 'Fail to get orders',
    });
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getOrders,
};
