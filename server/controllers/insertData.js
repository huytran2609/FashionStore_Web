const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const data = require('../data/FashionStoreData5.json');
const dataCate = require('../data/Categories');

const fn = async (product) => {
    await Product.create({
        title: product?.title,
        slug: slugify(product?.title),
        brand: product?.brand,
        description: product?.description,
        price: product?.price,
        category: product?.category[0],
        quantity: Math.round(Math.random() * 500),
        sold: Math.round(Math.random() * 200),
        thumbnail: product?.thumb,
        images: product?.images,
        color: product?.color,
        size: product?.size,
        totalRatings: Math.round(Math.random() * 5),
    });
};

const insertProduct = asyncHandler(async (req, res) => {
    const promise = [];
    for (let product of data) {
        promise.push(fn(product));
    }
    await Promise.all(promise);
    return res.json('Insert data successfully!');
});

const fn2 = async (category) => {
    await Category.create({
        title: category?.title,
        childrenCategory: category?.children,
    });
};
const insertCategory = asyncHandler(async (req, res) => {
    const promise = [];
    for (let cate of dataCate) {
        promise.push(fn2(cate));
    }
    await Promise.all(promise);
    return res.json('Insert data successfully!');
});

module.exports = {
    insertProduct,
    insertCategory,
};
