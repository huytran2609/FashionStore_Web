import styles from './Cart.module.scss';
import { Row, Col } from 'antd';

export default function Cart() {
    return <>
        <Row style={{ margin: '70px 0 10px 50px', color: '#000', fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'center' }} col={3}>
            Cart
        </Row>
        <Row style={{ margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
            <Col span={10}>

            </Col>
            <Col className='p-5' span={14}>

            </Col>
        </Row>
    </>;
}
