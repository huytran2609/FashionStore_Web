import axios from '../axios';

export const getAllProducts = (params) => {
    return axios.get('/product/', { params });
};

export const getProductDetail = (id) => {
    return axios.get(`/product/${id}`);
};

export const getProductsWomen = () => {
    return axios.get('/product/women');
};

export const getProductsMen = () => {
    return axios.get('/product/men');
};

export const getProductsBeauty = () => {
    return axios.get('/product/beauty');
};

export const getProductsKids = () => {
    return axios.get('/product/kids');
};

export const getProductsLifestyle = () => {
    return axios.get('/product/lifestyle');
};
