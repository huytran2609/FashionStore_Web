import styles from './Profile.module.scss'
import { Row, Col } from 'antd';
import Button from '~/components/Button/Button';
import InputInformation from '~/layouts/public/InputInformation/InputInformation';
import LeftProfile from '~/layouts/public/LeftProfile/LeftProfile';

export default function Profile() {
    return (
        <>
            <Row style={{ height: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5 pt-10 flex justify-center' span={17}>
                    <div className='w-2/4'>
                        <InputInformation classTitle='font-bold text-center text-2xl' base='mt-6 h-14' title='User Information' readOnly={true} />
                        <div className='flex'>
                            <Button content='Edit' classParent={styles.btnEdit} />
                            <Button classParent={styles.btnUpdate} content='Save' />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
