import LeftProfile from '~/layouts/public/LeftProfile/LeftProfile';
import styles from './HistoryOrder.module.scss';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetUserOrder } from '~/apis/order';
import orderEmpty from '~/assets/Cart/emptyOrder.jpeg';
import { formatCreatedAt } from '~/utils/helpers';

export default function HistoryOrder() {
    const [userOrder, setUserOrder] = useState([]);
    useEffect(() => {
        const fetchUserOrder = async () => {
            const response = await apiGetUserOrder();
            console.log(response);
            if (response.success) {
                setUserOrder(response.userOrder);
            }
        };
        fetchUserOrder();
    }, []);
    return (
        <>
            <Row
                style={{
                    minHeight: '600px',
                    margin: '90px 50px 10px 50px',
                    backgroundColor: '#fff',
                    boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px',
                }}
                col={9}
            >
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile userId={userOrder[0]?.orderBy?.userId} />
                </Col>
                <Col className="p-5" span={17}>
                    <table className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th style={{ width: '16%' }}>NUMBER</th>
                                <th style={{ width: '24%' }}>ORDER ITEMS</th>
                                <th style={{ width: '27%' }}>CREATE AT</th>
                                <th style={{ width: '19.5%' }}>STATE</th>
                                <th>TOTAL</th>
                            </tr>
                        </tbody>
                    </table>
                    {userOrder.length > 0 ? (
                        <div
                            style={{
                                fontSize: '18px',
                                textAlign: 'center',
                                maxHeight: '500px',
                                overflow: 'auto',
                                border: '0.5px solid #d4d4d4',
                                boxShadow: '1px 2px 2px 1px rgba(155, 155, 155, 0.25)',
                            }}
                        >
                            <table className={styles.listOrder}>
                                <tbody>
                                    {userOrder.reverse().map((orderItem, index) => (
                                        <tr key={index}>
                                            <td>&#35;{userOrder.length - index}</td>
                                            <td>Order&nbsp;{userOrder.length - index}</td>
                                            <td>{formatCreatedAt(orderItem.createdAt)}</td>
                                            <td style={{ color: 'darkorange' }}>{orderItem.status.toString()}</td>
                                            <td>{orderItem.totalPrice}</td>
                                            <td>
                                                <span
                                                    
                                                    className="bg-red-600 rounded-md border border-red-600 text-white text-[12px] w-12 p-1 hover:bg-red-700 hover:text-white cursor-pointer"
                                                >
                                                    Cancel
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr style={{ visibility: 'hidden' }}>
                                        <th>NUMBER</th>
                                        <th>ORDER ITEMS</th>
                                        <th>CREATE AT</th>
                                        <th>STATE</th>
                                        <th>TOTAL</th>
                                        <th>Action</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div
                            style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {console.log(userOrder.length)}
                            <img style={{ height: '55%' }} src={orderEmpty} alt="" />
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
}
