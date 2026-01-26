import axiosDefault from 'axios'

export const apiGetPublicProvinces = () => {
    return new Promise((resolve, reject) => {
        axiosDefault({
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province/'
        })
        .then(resolve)
        .catch(reject)
    })
}

export const apiGetPublicDistrict = (provinceId) => {
    return new Promise((resolve, reject) => {
        axiosDefault({
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        .then(resolve)
        .catch(reject)
    })
}