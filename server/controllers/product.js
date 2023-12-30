const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs!');
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const thumbnail = req?.files?.thumbnail[0]?.path;
    const images = req?.files?.images?.map((el) => el.path);
    if(thumbnail) req.body.thumbnail = thumbnail;
    if(images) req.body.images = images;
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Fail to create product',
    });
});

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

const getProductsWomen = asyncHandler(async (req, res) => {
    // const { category } = req.params;
    const product = await Product.find({ category: 'Women' }).sort({ title: 1 }).limit(25);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

const getProductsMen = asyncHandler(async (req, res) => {
    // const { category } = req.params;
    const product = await Product.find({ category: 'Men' }).sort({ title: 1 }).limit(25);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

const getProductsBeauty = asyncHandler(async (req, res) => {
    // const { category } = req.params;
    const product = await Product.find({ category: 'Beauty' }).sort({ title: 1 }).limit(25);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

const getProductsKids = asyncHandler(async (req, res) => {
    // const { category } = req.params;
    const product = await Product.find({ category: 'Kids' }).sort({ title: 1 }).limit(25);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

const getProductsLifestyle = asyncHandler(async (req, res) => {
    // const { category } = req.params;
    const product = await Product.find({ category: 'Lifestyle' }).sort({ title: 1 }).limit(25);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Fail to get product',
    });
});

//Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
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
    if(queries?.q) {
        delete formatedQueries.q
        const regex = { $regex: queries?.q, $options: 'i' };
        formatedQueries.$or = [
            { title: regex },
            { color: regex },
            { category: regex },
            { brand: regex },
        ];
    }

    let queryCommand = Product.find(formatedQueries);

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
            const counts = await Product.find(formatedQueries).countDocuments();
            // Lọc và lộn xộn mảng result
            // const shuffledResult = result.filter(() => true).sort(() => Math.random() - 0.5);
            return res.status(200).json({
                success: result ? true : false,
                counts,
                products: result ? result : 'Fail to get products',
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : 'Fail to update products',
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct
            ? `Product ${deletedProduct._id} is deleted successfully`
            : 'Fail to delete products',
    });
});

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) throw new Error('Missing inputs!');
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings.find((el) => el.postedBy.toString() === _id);
    if (alreadyRating) {
        //Update star & comment
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
            },
            { new: true },
        );
    } else {
        // add star && comment
        const response = await Product.findByIdAndUpdate(
            pid,
            {
                $push: { ratings: { star, comment, postedBy: _id } },
            },
            { new: true },
        );
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid);
    const countRatings = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
    updatedProduct.totalRatings = Math.round((sumRatings * 10) / countRatings) / 10;
    await updatedProduct.save();

    return res.status(200).json({
        success: true,
        updatedProduct,
    });
});
//upload image product
const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) throw new Error('Missing inputs!');
    const response = await Product.findByIdAndUpdate(
        pid,
        {
            $push: { images: { $each: req.files.map((el) => el.path) } },
        },
        { new: true },
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Fail to upload images',
    });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct,
    getProductsWomen,
    getProductsMen,
    getProductsBeauty,
    getProductsKids,
    getProductsLifestyle,
};
