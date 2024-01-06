import axios from '../axios';

export const getAllUser = () => {
    return axios.get('/user/');
};

export const apiGetCurrent = () => {
    return axios.get('/user/current');
};

export const apiUpdateCurrent = (data) => {
    return axios.put('/user/current', data);
};

export const apiRegister = (data) => {
    return axios.post('/user/register', data, {withCredentials: true});
};

export const apiFinalRegister = (token) => {
    return axios.put(`/user/verifyEmail/${token}`);
};

export const apiForgotPassword = (data) => {
    return axios.post('/user/forgotPassword', data);
};

export const apiResetPassword = (data) => {
    return axios.put('/user/resetPassword', data);
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
