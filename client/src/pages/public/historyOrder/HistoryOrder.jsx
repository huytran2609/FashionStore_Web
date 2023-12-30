import LeftProfile from '~/layouts/public/LeftProfile/LeftProfile';
import styles from './HistoryOrder.module.scss'
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetUserOrder } from '~/apis/order';

export default function HistoryOrder() {

    const formatCreatedAt = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const hours = createdAtDate.getHours();
        const minutes = createdAtDate.getMinutes();
        const day = createdAtDate.getDate();
        const month = createdAtDate.getMonth() + 1;
        const year = createdAtDate.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    const [userOrder, setUserOrder] = useState([]);
    useEffect(() => {
        const fetchUserOrder = async () => {
            const response = await apiGetUserOrder();
            console.log(response);
            if (response.success) {
                setUserOrder(response.userOrder)
            }
        }
        fetchUserOrder();
    }, [])
    return (
        <>
            <Row style={{ minHeight: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5' span={17}>
                    <table className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th>NUMBER</th>
                                <th>ORDER ITEMS</th>
                                <th>CREATE AT</th>
                                <th>STATE</th>
                                <th>TOTAL</th>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ maxHeight: '500px', overflow: 'auto', border: '0.5px solid #d4d4d4', boxShadow: '1px 2px 2px 1px rgba(155, 155, 155, 0.25)' }}>
                        <table className={styles.listOrder}>
                            <tbody>
                                {userOrder.map((orderItem, index) => (
                                    <tr key={index}>
                                        <td>&#35;{index + 1}</td>
                                        <td>Order&nbsp;{index + 1}</td>
                                        <td>{formatCreatedAt(orderItem.createdAt)}</td>
                                        <td style={{ color: 'darkorange' }}>{orderItem.status.toString()}</td>
                                        <td>{orderItem.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </Col>
            </Row>
        </>
    )
}
