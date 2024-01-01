import axios from '../axios';

export const apiCreateOrder = (data) => {
    return axios.post('/order/create', data);
};

export const apiGetUserOrder = () => {
    return axios.get('/order/userOrder');
};

export const apigetOrderDetail = (oid) => {
    return axios.get(`/order/orderDetail/${oid}`);
};

export const apiDeleteUserOrder = (orderId) => {
    return axios.put(`/order/cancelOrder/${orderId}`);
};

export const adminGetUserOrder = () => {
    return axios.get('/order');
};
