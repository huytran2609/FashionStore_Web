const User = require('../models/user');
const Product = require('../models/product');
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
        const { password, refreshToken, ...userData } = user.toObject();
        const accessToken = generateAccessToken(user._id, user.role);
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
    const user = await User.findById(_id).select('-refreshToken -password').populate({
        path: 'cart',
        populate: {
            path: 'product',
            select: 'title price thumbnail size',
        },  
    });
    return res.status(200).json({
        success: user ? true : false,
        response: user ? user : 'User not found ',
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);
    //Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);

    // Thêm điều kiện tìm kiếm người dùng với vai trò là "customer"
    formatedQueries.role = 2;

    //Filtering
    if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: 'i' };

    if (req.query.q) {
        delete formatedQueries.q;
        const regex = { $regex: req.query.q, $options: 'i' };
        formatedQueries.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    let queryCommand = User.find(formatedQueries);

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination, limit: số Object lấy về từ gọi API, skip: lấy bắt đầu từ số 'skip'
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Execute queries
    //Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
    queryCommand
        .then(async (result) => {
            const counts = await User.find(formatedQueries).countDocuments();
            return res.status(200).json({
                success: result ? true : false,
                counts,
                users: result ? result : 'Fail to get users',
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!uid) throw new Error('Missing input!');
    const user = await User.findByIdAndDelete(uid);
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? `User ${user.email} deleted` : 'No user to delete',
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
        mes: user ? 'Updated' : 'Update failed',
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
    // const alreadyProduct = user?.cart?.find((item) => item?.product.toString() === pid && item?.color === color);
    const alreadyProduct = user?.cart?.find((item) => item?.product.toString() === pid);
    if (alreadyProduct) {
        if(alreadyProduct.color.includes(color)) {
            const response = await User.updateOne(
                { cart: { $elemMatch: alreadyProduct } },
                { $set: { 'cart.$.quantity': alreadyProduct.quantity + +quantity } },
                { new: true },
            );
            return res.status(200).json({
                success: response ? true : false,
                mes: response ? 'Update cart' : 'Update failed',
            });
        }
        else {
            const response = await User.updateOne(
                { cart: { $elemMatch: alreadyProduct } },
                { $set: { 'cart.$.quantity': alreadyProduct.quantity + +quantity } },
                { new: true },
            );
            return res.status(200).json({
                success: response ? true : false,
                mes: response ? 'Update cart' : 'Update failed',
            });
        }
    
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Update cart' : 'Update failed',
        });
    }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, color } = req.params;
    if (!pid) throw new Error('Missing input!');
    const user = await User.findById(_id).select('cart');
    let filter = { product: pid };

    // Nếu color là một mảng, thêm điều kiện để chỉ xóa mảng color
    if (Array.isArray(color) && color.length > 0) {
        filter.color = { $in: color };
    } else if (color) {
        filter.color = color;
    }
    // const alreadyProduct = user?.cart?.find((item) => item?.product.toString() === pid && item?.color === color);
    const alreadyProduct = user?.cart?.find((item) => item?.product.toString() === pid);
    if(!alreadyProduct) {
        return res.status(200).json({
            success: true,
            mes: 'Product not found',
        });
    }
    const response = await User.findByIdAndUpdate(_id, { $pull: { cart: filter  } }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Update cart' : 'Update failed',
    })
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
    removeProductFromCart,
};
