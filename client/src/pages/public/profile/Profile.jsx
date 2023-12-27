import styles from './Profile.module.scss'
import { Row, Col } from 'antd';

export default function Profile() {
    return (
        <>
            <Row style={{ height: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={8}>

                </Col>
                <Col className='p-5' span={16}>

                </Col>
            </Row>
        </>
    )
}
