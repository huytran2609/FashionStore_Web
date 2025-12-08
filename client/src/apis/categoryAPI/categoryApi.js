import axios from '../axios';

const categoryApi = {
    getAll() {
        const url = '/category/';
        return axios.get(url);
    },

    get(id) {
        const url = `/category/${id}`;
        return axios.get(url);
    },

    add(data) {
        const url = '/category/';
        return axios.post(url, data);
    },

    update(data) {
        const url = `/category/${data.id}`;
        return axios.patch(url, data);
    },

    remove(id) {
        const url = `/category/${id}`;
        return axios.delete(url);
    },
};

export default categoryApi;
