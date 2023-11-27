const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) throw new Error('Missing inputs');
    const newCoupon = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: newCoupon ? true : false,
        createdCoupon: newCoupon ? newCoupon : 'Fail to create coupon',
    });
});

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt');
    return res.status(200).json({
        success: response ? true : false,
        dataCoupons: response ? response : 'Fail to get coupons',
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs!');
    const response = await Coupon.findByIdAndUpdate(cpid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Fail to update coupon',
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    const response = await Coupon.findByIdAndDelete(cpid);
    return res.status(200).json({
        success: response ? true : false,
        deletedCoupon: response ? `Coupon ${response.name} is deleted successfully` : 'Fail to delete coupon',
    });
});

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
};
