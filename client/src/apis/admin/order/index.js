import axios from '~/apis/axios'

export const apiGetOrders = (params = {}) => {
    return axios.get('/order', {params})
}