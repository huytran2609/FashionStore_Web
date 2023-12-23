import axios from '../axios';

export const getAllUser = () => {
    return axios.get('/user/');
};

export const apiRegister = (data) => {
    return axios.post('/user/register', data);
};

export const apiLogin = (data) => {
    return axios.post('/user/login', data);
};