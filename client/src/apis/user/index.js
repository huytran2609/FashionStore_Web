import axios from '../axios';

export const getAllUser = () => {
    return axios.get('/user/');
};

export const apiGetCurrent = () => {
    return axios.get('/user/current');
};

export const apiRegister = (data) => {
    return axios.post('/user/register', data);
};

export const apiLogin = (data) => {
    return axios.post('/user/login', data);
};

export const apiCart = (data) => {
    return axios.put('/user/cart', data);
};

export const apiRemoveCart = (pid, color) => {
    let url = `/user/removeCart/${pid}`;

    // Nếu color tồn tại, thêm vào URL
    if (color) {
        url += `/${color}`;
    }

    return axios.delete(url);
};
