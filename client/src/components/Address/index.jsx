import { useEffect, useState } from "react";
import SelectAddress from "../SelectAddress";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "~/apis/address";

function Address({ setAddressDefault, name }) {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)
    const [pro, setPro] = useState('')
    const [dis, setDis] = useState('')

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict(null)
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setPro(province ? provinces?.find(item => item.province_id === province)?.province_name : '')
    }, [province])
    useEffect(() => {
        setDis(district ? districts?.find(item => item.district_id === district)?.district_name : '')
    }, [district])
    useEffect(() => {
        setAddressDefault(`${dis}, ${pro}`)
    }, [pro, dis])
    // useEffect(() => {
    //     setPayload(prev => ({
    //         ...prev,
    //         address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
    //         province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
    //     }))

    // }, [province, district])
    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <SelectAddress type='province' value={province} setValue={setProvince} options={provinces} label='Province/City' />
                    <SelectAddress reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='District/Town' />
                </div>
                <input
                    placeholder='Quận 1, Thành Phố Hồ Chí Minh'
                    type='text'
                    name={name}
                    readOnly
                    className='border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full'
                    value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}` || ''}
                />

            </div>
        </div>
    )
}

export default Address;