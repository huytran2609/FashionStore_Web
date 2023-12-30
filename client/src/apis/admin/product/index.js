import axios from '~/apis/axios'

export const apiCreateProduct = () => {
    return axios.post('/product/create')
}