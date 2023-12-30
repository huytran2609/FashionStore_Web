const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, totalPrice, phone, address, coupon } = req.body;
    if (address) {
        await User.findByIdAndUpdate(_id, { phone, address, cart: [] });
    }
    const user = await User.findById(_id).select('name');
    const createdData = { products, totalPrice, orderBy: {userId: _id, name: user.name, address} };
    // const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');
    // const products = userCart?.cart?.map((item) => ({
    //     product: item.product._id,
    //     quantity: item.quantity,
    //     color: item.color[0],
    // }));
    // let total = userCart?.cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    // const createdData = { products, totalPrice: total, orderBy: _id };
    // if (coupon) {
    //     const selectedCoupon = await Coupon.findById(coupon);
    //     total = Math.round((total * (1 - selectedCoupon?.discount / 100)) / 1000) * 1000;
    //     createdData.totalPrice = total;
    //     createdData.coupon = coupon;
    // }
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
    const response = await Order.find({ 'orderBy.userId': _id });
    return res.status(200).json({
        success: response ? true : false,
        userOrder: response ? response : 'Fail to get user order',
    });
});

const getOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);
    //Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };

    // let queryObject = {}
    if (queries?.q) {
        delete formatedQueries.q;
        const regex = { $regex: queries?.q, $options: 'i' };
        formatedQueries.$or = [{ title: regex }, { color: regex }, { category: regex }, { brand: regex }];
    }

    let queryCommand = Order.find(formatedQueries);

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }
    if (!req.query.sort) {
        queryCommand = queryCommand.sort({ title: -1 });
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination, limit: số Object lấy về từ gọi API, skip: lấy bắt đầu từ số 'skip'
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Execute queries
    //Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
    queryCommand
        .then(async (result) => {
            const counts = await Order.find(formatedQueries).countDocuments();
            // Lọc và lộn xộn mảng result
            // const shuffledResult = result.filter(() => true).sort(() => Math.random() - 0.5);
            return res.status(200).json({
                success: result ? true : false,
                counts,
                Orders: result ? result : 'Fail to get orders',
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getOrders,
};
