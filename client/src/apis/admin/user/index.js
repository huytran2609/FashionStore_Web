import axios from '~/apis/axios'

export const apiGetUsers = (params = {}) => {
    return axios.get('/user', {params})
}