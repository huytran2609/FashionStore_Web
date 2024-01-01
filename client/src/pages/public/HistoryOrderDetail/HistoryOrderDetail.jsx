import LeftProfile from '~/layouts/public/LeftProfile/LeftProfile'
import { Col, Row } from 'antd';
import styles from './HistoryOrderDetail.module.scss'
import Button from '~/components/Button/Button';

export default function HistoryOrderDetail() {
    return (
        <>
            <Row style={{ minHeight: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5' span={17}>
                    <section style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '40px' }} >Order 22</h1>
                        <div style={{ fontSize: '16px', marginLeft: '40px', borderRadius: '30px', color: '#fff', backgroundColor: 'orange', padding: '5px 20px' }} >
                            Process
                        </div>
                        <Button classParent={styles.btnCancel} content='Cancel Order' />
                    </section>
                    <section className={styles.infoOrder}>
                        <h1>Customer Name: <span>ABC</span></h1>
                        <h1>Delivery Address: <span>mot hai ba bon nam sau</span></h1>
                        <h1>Create At: <span>12:20 23/01/2024</span></h1>
                        <h1>Total Order Price: <span style={{ color: 'red', fontSize: '30px', paddingLeft: '10px', fontWeight: 'bold' }}>123.12$</span></h1>
                    </section>
                    <table style={{ marginTop: '10px' }} className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th style={{ width: '13%' }}>NUMBER</th>
                                <th style={{ width: '17%' }}>PRODUCT NAME</th>
                                <th style={{ width: '22%' }}>QUANTITY</th>
                                <th style={{ width: '13.5%' }}>COLOR</th>
                                <th style={{ width: '12%' }}>SUB PRICE</th>
                                <th>SUB TOTAL PRICE</th>
                            </tr>
                        </tbody>
                    </table>

                </Col>
            </Row>
        </>
    )
}
