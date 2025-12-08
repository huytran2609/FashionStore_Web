import axios from '../axios';

/**
 * Get all products with optional filtering, sorting, and pagination
 * @param {object} params - Query parameters
 * @param {string} params.category - Filter by category (e.g., 'Women', 'Men', 'Beauty', 'Kids', 'Lifestyle')
 * @param {string} params.q - Search query (searches in title, color, category, brand)
 * @param {string} params.title - Filter by title (regex match)
 * @param {number} params.limit - Number of products per page (default: 20)
 * @param {number} params.page - Page number (default: 1)
 * @param {string} params.sort - Sort field(s) (e.g., 'title', '-createdAt')
 * @param {string} params.fields - Fields to select
 * @returns {Promise} - Axios response with products data
 */
export const getAllProducts = (params) => {
    return axios.get('/product/', { params });
};

/**
 * Get product detail by ID
 * @param {string} id - Product ID
 * @returns {Promise} - Axios response with product data
 */
export const getProductDetail = (id) => {
    return axios.get(`/product/${id}`);
};
