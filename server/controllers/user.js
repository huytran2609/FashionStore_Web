const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('User has existed');
    } else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register is succesfull.' : 'Something went wrong',
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs',
        });
    const user = await User.findOne({ email });
    if (user && (await user.isCorrectPassword(password))) {
        //Lấy password và role ra từ dữ liệu trả về
        const { password, role, refreshToken, ...userData } = user.toObject();
        const accessToken = generateAccessToken(user._id, role);
        const newRefreshToken = generateRefreshToken(user._id);
        //Lưu refresh token vào database
        await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true }); //new: true -- trả về data sau khi update
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error('invalid credentials');
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password');
    return res.status(200).json({
        success: user ? true : false,
        response: user ? user : 'User not found ',
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-refreshToken -password');
    return res.status(200).json({
        success: users ? true : false,
        users,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    if (!_id) throw new Error('Missing input!');
    const user = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: user ? true : false,
        deletedUser: user ? `User ${user.email} deleted` : 'No user to delete',
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing input!');
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -refreshToken');
    return res.status(200).json({
        success: user ? true : false,
        updatedUser: user ? user : 'Update failed',
    });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing input!');
    const user = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -refreshToken');
    return res.status(200).json({
        success: user ? true : false,
        updatedUser: user ? user : 'Update failed',
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    //Lấy token từ cookies
    const cookie = req.cookies;
    //Check có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
    //Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });
    return res.status(200).json({
        success: true,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched',
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    //Check có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
    //xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    //xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        succes: true,
        mes: 'Logout is done',
    });
});

const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) throw new Error('Missing input!');
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
        '-password -refreshToken',
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Update failed',
    });
});

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity = 1, color } = req.body;
    if (!pid || !color) throw new Error('Missing input!');
    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart?.find((item) => item?.product.toString() === pid && item?.color === color);
    if (alreadyProduct) {
        const response = await User.updateOne(
            { cart: { $elemMatch: alreadyProduct } },
            { $set: { 'cart.$.quantity': alreadyProduct.quantity + +quantity } },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Update failed',
        });
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Update failed',
        });
    }
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
};
