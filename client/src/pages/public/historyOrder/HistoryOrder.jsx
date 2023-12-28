import LeftProfile from '~/layouts/public/LeftProfile/LeftProfile';
import styles from './HistoryOrder.module.scss'
import { Row, Col } from 'antd';

export default function HistoryOrder() {
    return (
        <>
            <Row style={{ height: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5' span={17}>

                </Col>
            </Row>
        </>
    )
}