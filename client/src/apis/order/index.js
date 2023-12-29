import axios from '../axios';

export const apiCreateOrder = () => {
    return axios.post('/order/create');
};