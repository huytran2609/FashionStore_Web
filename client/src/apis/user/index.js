import axios from '../axios';

export const getAllUser = () => {
    return axios.get('/user/');
};
