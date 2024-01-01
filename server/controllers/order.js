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
    const createdData = { products, totalPrice, orderBy: { userId: _id, name: user.name, address } };
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
    const response = await Order.find({ 'orderBy.userId': _id })
    return res.status(200).json({
        success: response ? true : false,
        userOrder: response ? response : 'Fail to get user order',
    });
});

const getOrderDetail = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { oid } = req.params;
    if(!oid) throw new Error('Order id is required');
    const response = await Order.findOne({ 'orderBy.userId': _id, _id: oid})
        .populate({
            path: 'products.product',
            model: 'Product',
            select: 'title price',
        })
        .exec();
    return res.status(200).json({
        success: response ? true : false,
        orderDetail: response ? response : 'Fail to get order detail',
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
    if (queries?.status) formatedQueries.status = { $regex: queries.status, $options: 'i' };

    // let queryObject = {}
    if (queries?.q) {
        delete formatedQueries.q;
        const regex = { $regex: queries?.q, $options: 'i' };
        formatedQueries.$or = [
            { 'orderBy.name': regex },
            { 'orderBy.address': regex },
            { status: regex },
            { 'products.product.title': regex },
            { 'products.color': regex },
        ];
    }

    let queryCommand = Order.find(formatedQueries);
    queryCommand = queryCommand.populate({
        path: 'products.product',
        model: 'Product', // Hãy chắc chắn sử dụng tên mô hình chính xác
        select: 'title price', // Chọn các trường bạn muốn bao gồm từ mô hình 'Product'
    });

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
                orders: result ? result : 'Fail to get orders',
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

const cancelUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { orderId } = req.params;

    try {
        // Kiểm tra xem đơn hàng có tồn tại không và có thuộc về người dùng không
        const order = await Order.findOne({ _id: orderId, 'orderBy.userId': _id });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Hủy đơn hàng
        await Order.findByIdAndDelete(orderId);

        return res.status(200).json({ success: true, message: 'Order canceled successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getOrders,
    cancelUserOrder,
    getOrderDetail,
};
