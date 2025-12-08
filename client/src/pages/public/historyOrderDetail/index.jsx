import LeftProfile from '~/layouts/public/leftProfile'
import { Col, Row } from 'antd';
import styles from './HistoryOrderDetail.module.scss'
import Button from '~/components/button';
import { useParams, useNavigate } from 'react-router-dom';
import { apigetOrderDetail } from '~/apis/order';
import { useState } from 'react';
import { formatCreatedAt, formattedCount } from '~/utils/helpers';
import { useFetch } from '~/hooks';
import { confirmAndExecute } from '~/utils/confirmDialog';
import { apiDeleteUserOrder } from '~/apis/order';
import config from '~/config';
import { toast } from 'react-toastify';

export default function HistoryOrderDetail() {
    const [update, setUpdate] = useState(false);
    const { oid } = useParams();
    
    const { data: orderResponse } = useFetch(() => apigetOrderDetail(oid), {
        dependencies: [oid, update],
    });
    
    const orderDetail = orderResponse?.orderDetail || null;
    const detailProduct = orderDetail?.products || null;
    console.log(orderDetail);
    // console.log(detailProduct);
    const navigate = useNavigate();

    const handleDelete = async () => {
        await confirmAndExecute(async () => {
            const response = await apiDeleteUserOrder(orderDetail._id);
            if (response.success) {
                toast.success('Cancel Order Successfully!');
                setUpdate(!update);
                navigate(config.history);
            } else {
                toast.error(response.mes);
            }
        });
    };

    return (
        <>
            <Row style={{ minHeight: '37.5rem', margin: '5.625rem 3.125rem 0.625rem 3.125rem', backgroundColor: '#fff', boxShadow: '0.0306rem 0.0599rem 0.2474rem rgba(0, 0, 0, 0.25)', borderRadius: '1.25rem', overflow: 'hidden', }} col={9}>
                <Col style={{ borderRight: '0.125rem solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5' span={17}>
                    <section style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem' }} >Order Detail</h1>
                        <div style={(orderDetail?.status==='Processing')?{ fontSize: '1rem', marginLeft: '2.5rem', borderRadius: '1.875rem', color: '#fff', backgroundColor: 'orange', padding: '0.3125rem 1.25rem' }:
                    { fontSize: '1rem', marginLeft: '2.5rem', borderRadius: '1.875rem', color: '#fff', backgroundColor: 'green', padding: '0.3125rem 1.25rem' }} >
                            {orderDetail?.status}
                        </div>
                        <Button onClick={(orderDetail?.status==='Processing')?handleDelete:''} classChild={(orderDetail?.status==='Processing')?'':styles.btnCancelChild} classParent={(orderDetail?.status==='Processing')?styles.btnCancel:styles.btnCancelDisable} content='Cancel Order' />
                    </section>
                    <section className={styles.infoOrder}>
                        <h1>Customer Name: <span>{orderDetail?.orderBy?.name}</span></h1>
                        <h1>Delivery Address: <span>{orderDetail?.orderBy?.address}</span></h1>
                        <h1>Create At: <span>{formatCreatedAt(orderDetail?.createdAt)}</span></h1>
                        <h1>Total Order Price: <span style={{ color: 'red', fontSize: '1.875rem', paddingLeft: '0.625rem', fontWeight: 'bold' }}>{orderDetail?.totalPrice}&nbsp;$</span></h1>
                    </section>
                    <table style={{ marginTop: '0.625rem', fontSize: '1.125rem' }} className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th style={{ width: '10%' }}>NUMBER</th>
                                <th style={{ width: '18%' }}>PRODUCT NAME</th>
                                <th style={{ width: '7%' }}>QUANTITY</th>
                                <th style={{ width: '9.5%' }}>COLOR</th>
                                <th style={{ width: '30.5%' }}>PRICE</th>
                                <th style={{ paddingRight: '2.4375rem' }}>SUB TOTAL PRICE</th>
                            </tr>
                        </tbody>
                    </table>
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
                                {detailProduct && detailProduct.length > 0 && detailProduct.map((detail, index) =>
                                    <tr key={index}>
                                        <td>&#35;{index + 1}</td>
                                        <td style={{ width: '12.5rem' }}>{detail.product.title}</td>
                                        <td>{detail?.quantity}</td>
                                        <td>{detail?.color}</td>
                                        <td>{detail?.product?.price}</td>
                                        <td>{formattedCount(Number(detail?.product?.price) * Number(detail?.quantity))}</td>
                                    </tr>
                                )}
                                {/* <tr style={{ visibility: 'hidden' }}>
                                    <th>NUMBER</th>
                                    <th>PRODUCT NAME</th>
                                    <th>QUANTITY</th>
                                    <th>COLOR</th>
                                    <th>PRICE</th>
                                    <th>SUB TOTAL PRICE</th>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </Col>
            </Row>
        </>
    )
}

