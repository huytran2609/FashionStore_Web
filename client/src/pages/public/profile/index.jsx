import { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import { Row, Col } from 'antd';
import Button from '~/components/button';
import InputInformation from '~/layouts/public/inputInformation';
import LeftProfile from '~/layouts/public/leftProfile';
import { useSelector, useDispatch } from 'react-redux';
import { apiUpdateCurrent } from '~/apis/user';
import { toast } from 'react-toastify';
import { getCurrent } from '~/redux/features/slices/asyncActions';

export default function Profile() {
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    // console.log(current);
    const [readOnly, setReadOnly] = useState(true);

    // State để lưu trữ giá trị từ InputInformation
    const [formData, setFormData] = useState({
        name: current?.name,
        email: current?.email,
        phone: current?.phone,
        address: current?.address,
    });

    const handleEdit = () => {
        setReadOnly(false);
    };

    const handleSave = async() => {
        const response = await apiUpdateCurrent(formData);
        if (response.success) {
            dispatch(getCurrent())
            toast.success(response.mes);
        }
        else{
            toast.error(response.mes);
        }
        setReadOnly(true);

        // formData chứa giá trị mới từ InputInformation
        console.log('Data from InputInformation:', formData);
    };

    // Callback function để cập nhật formData từ InputInformation
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <Row className={styles.profileContainer} col={9}>
                <Col className={styles.profileBorder} span={7}>
                    <LeftProfile />
                </Col>
                <Col className="p-5 pt-10 flex justify-center" span={17}>
                    <div className="w-2/4">
                        {/* Truyền hàm callback và giá trị hiện tại từ InputInformation */}
                        <InputInformation
                            info={current ? current : ''}
                            classTitle="font-bold text-center"
                            base="mt-6 h-14"
                            title="User Information"
                            readOnly={readOnly}
                            onInputChange={handleInputChange}
                        />
                        <div className="flex">
                            <Button onClick={handleEdit} content="Edit" classParent={styles.btnEdit} />
                            <Button onClick={handleSave} classParent={styles.btnUpdate} content="Save" />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

