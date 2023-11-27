const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const newCategory = await Category.create(req.body);
    return res.status(200).json({
        success: newCategory ? true : false,
        createdCategory: newCategory ? newCategory : 'Fail to create category',
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const Categories = await Category.find();
    return res.status(200).json({
        success: Categories ? true : false,
        dataCategories: Categories ? Categories : 'Fail to get categories',
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const response = await Category.findByIdAndUpdate(cid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Fail to update category',
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const response = await Category.findByIdAndDelete(cid);
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? `Category ${response._id} is deleted successfully` : 'Fail to delete category',
    });
});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
