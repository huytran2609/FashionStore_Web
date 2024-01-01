import axios from '~/apis/axios'

export const apiCreateProduct = (data) => {
    return axios.post('/product/create', data)
}

export const apiDeleteProduct = (pid) => {
    return axios.delete(`/product/${pid}`)
}