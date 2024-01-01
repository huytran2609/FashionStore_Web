import axios from '~/apis/axios'

export const apiGetOrders = (params = {}) => {
    return axios.get('/order', {params})
}

export const apiUpdateStatusOrder = (oid, data) => {
    return axios.put(`/order/status/${oid}`, data)
}