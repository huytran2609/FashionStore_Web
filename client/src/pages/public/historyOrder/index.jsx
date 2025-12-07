import LeftProfile from '~/layouts/public/leftProfile';
import styles from './HistoryOrder.module.scss';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { apiDeleteUserOrder, apiGetUserOrder } from '~/apis/order';
import orderEmpty from '~/assets/cart/emptyOrder.jpeg';
import { formatCreatedAt } from '~/utils/helpers';
import { FaInfoCircle } from "react-icons/fa";
import Button from '~/components/button';
import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function HistoryOrder() {
    const [userOrder, setUserOrder] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchUserOrder = async () => {
            const response = await apiGetUserOrder();
            // console.log(response);
            if (response.success) {
                setUserOrder(response.userOrder);
            }
        };
        fetchUserOrder();
    }, [update]);

    const handleDelete = async (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUserOrder(orderId);
                if (response.success) {
                    setUpdate(!update);
                    toast.success('Cancel Order Successfully!');
                } else {
                    toast.error(response.mes);
                }
            }
        });
    };
    console.log(userOrder)

    return (
        <>
            <Row
                style={{
                    minHeight: '37.5rem',
                    margin: '5.625rem 3.125rem 0.625rem 3.125rem',
                    backgroundColor: '#fff',
                    boxShadow: '0.0306rem 0.0599rem 0.2474rem rgba(0, 0, 0, 0.25)',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                }}
                col={9}
            >
                <Col style={{ borderRight: '0.125rem solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className="p-5" span={17}>
                    <table className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th style={{ width: '13%' }}>NUMBER</th>
                                <th style={{ width: '17%' }}>ORDER ITEMS</th>
                                <th style={{ width: '20%' }}>CREATE AT</th>
                                <th style={{ width: '10.5%', paddingLeft: '2.5rem' }}>STATE</th>
                                <th style={{ width: '14%', paddingLeft: '2.5rem' }}>TOTAL</th>
                                <th style={{ paddingRight: '1.875rem' }}>ORDER OPTION</th>
                            </tr>
                        </tbody>
                    </table>
                    {userOrder.length > 0 ? (
                        <div
                            style={{
                                fontSize: '1.125rem',
                                textAlign: 'center',
                                maxHeight: '31.25rem',
                                overflow: 'auto',
                                border: '0.0313rem solid #d4d4d4',
                                boxShadow: '0.0625rem 0.125rem 0.125rem 0.0625rem rgba(155, 155, 155, 0.25)',
                            }}
                        >
                            <table className={styles.listOrder}>
                                <tbody>
                                    {userOrder.reverse().map((orderItem, index) => (
                                        <tr key={index}>
                                            <td>&#35;{userOrder.length - index}</td>
                                            <td>Order&nbsp;{userOrder.length - index}</td>
                                            <td>{formatCreatedAt(orderItem.createdAt)}</td>
                                            <td style={(orderItem.status.toString()==='Processing')?{ color: 'darkorange' }:{color: 'green'}}>{orderItem.status.toString()}</td>
                                            <td>{orderItem.totalPrice}</td>
                                            <td style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                                                <Link to={`${config.historydetail.replace(":oid", orderItem._id)}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    Detail&nbsp;<FaInfoCircle />
                                                </Link>
                                                <Link onClick={orderItem.status==='Processing'?(() => handleDelete(orderItem._id)):''} classChild={(orderItem.status==='Processing')?'':styles.btnCancelChild} className={(orderItem.status==='Processing')?styles.btnCancel:styles.btnCancelDisable}>Cancel</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr style={{ visibility: 'hidden' }}>
                                        <th>NUMBER</th>
                                        <th>ORDER ITEMS</th>
                                        <th>CREATE AT</th>
                                        <th>STATE</th>
                                        <th>TOTAL</th>
                                        <th>OPTION</th>
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

