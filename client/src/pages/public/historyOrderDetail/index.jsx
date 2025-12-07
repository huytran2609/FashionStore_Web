import LeftProfile from '~/layouts/public/leftProfile'
import { Col, Row } from 'antd';
import styles from './HistoryOrderDetail.module.scss'
import Button from '~/components/button';
import { useParams, useNavigate } from 'react-router-dom';
import { apigetOrderDetail } from '~/apis/order';
import { useEffect, useState } from 'react';
import { formatCreatedAt } from '~/utils/helpers';
import Swal from 'sweetalert2';
import { apiDeleteUserOrder } from '~/apis/order';
import config from '~/config';
import { toast } from 'react-toastify';

export default function HistoryOrderDetail() {

    const [orderDetail, setOrderDetail] = useState(null)
    const [detailProduct, setDetailProduct] = useState(null)
    const [update, setUpdate] = useState(false);

    const { oid } = useParams()
    // console.log(oid);
    useEffect(() => {
        const fetchOrderDetail = async () => {
            const response = await apigetOrderDetail(oid)
            if (response.success) {
                setOrderDetail(response.orderDetail);
                setDetailProduct(response.orderDetail.products);
            }
        }
        fetchOrderDetail()
    }, [])
    console.log(orderDetail);
    // console.log(detailProduct);
    const navigate = useNavigate();

    const formattedCount = (numberValue) => Number(numberValue).toFixed(2);
    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUserOrder(orderDetail._id);
                toast.success('Cancel Order Successfully!');
                if (response.success) {
                    setUpdate(!update);
                    navigate(config.history)
                } else {
                    toast.error(response.mes);
                }
            }
        });
    };

    return (
        <>
            <Row style={{ minHeight: '600px', margin: '90px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px', overflow: 'hidden', }} col={9}>
                <Col style={{ borderRight: '2px solid #ececec' }} span={7}>
                    <LeftProfile />
                </Col>
                <Col className='p-5' span={17}>
                    <section style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '40px' }} >Order Detail</h1>
                        <div style={(orderDetail?.status==='Processing')?{ fontSize: '16px', marginLeft: '40px', borderRadius: '30px', color: '#fff', backgroundColor: 'orange', padding: '5px 20px' }:
                    { fontSize: '16px', marginLeft: '40px', borderRadius: '30px', color: '#fff', backgroundColor: 'green', padding: '5px 20px' }} >
                            {orderDetail?.status}
                        </div>
                        <Button onClick={(orderDetail?.status==='Processing')?handleDelete:''} classChild={(orderDetail?.status==='Processing')?'':styles.btnCancelChild} classParent={(orderDetail?.status==='Processing')?styles.btnCancel:styles.btnCancelDisable} content='Cancel Order' />
                    </section>
                    <section className={styles.infoOrder}>
                        <h1>Customer Name: <span>{orderDetail?.orderBy?.name}</span></h1>
                        <h1>Delivery Address: <span>{orderDetail?.orderBy?.address}</span></h1>
                        <h1>Create At: <span>{formatCreatedAt(orderDetail?.createdAt)}</span></h1>
                        <h1>Total Order Price: <span style={{ color: 'red', fontSize: '30px', paddingLeft: '10px', fontWeight: 'bold' }}>{orderDetail?.totalPrice}&nbsp;$</span></h1>
                    </section>
                    <table style={{ marginTop: '10px', fontSize: '18px' }} className={styles.listOrder}>
                        <tbody>
                            <tr>
                                <th style={{ width: '10%' }}>NUMBER</th>
                                <th style={{ width: '18%' }}>PRODUCT NAME</th>
                                <th style={{ width: '7%' }}>QUANTITY</th>
                                <th style={{ width: '9.5%' }}>COLOR</th>
                                <th style={{ width: '30.5%' }}>PRICE</th>
                                <th style={{ paddingRight: '39px' }}>SUB TOTAL PRICE</th>
                            </tr>
                        </tbody>
                    </table>
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
                                {detailProduct && detailProduct.length > 0 && detailProduct.map((detail, index) =>
                                    <tr key={index}>
                                        <td>&#35;{index + 1}</td>
                                        <td style={{ width: '200px' }}>{detail.product.title}</td>
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

