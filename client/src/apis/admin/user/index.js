import axios from '~/apis/axios'

export const apiGetUsers = (params = {}) => {
    return axios.get('/user', {params})
}

export const apiUpdateUser = (data, uid) => {
    return axios.put(`/user/${uid}`, data)
}

export const apiDeleteUser = (uid) => {
    return axios.delete(`/user/${uid}`)
}