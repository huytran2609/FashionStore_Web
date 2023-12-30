import axios from '../axios';

export const apiCreateOrder = (data) => {
    return axios.post('/order/create', data);
};

export const apiGetUserOrder = () => {
    return axios.get('/order/userOrder');
};