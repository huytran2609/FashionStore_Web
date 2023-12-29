import styles from './Cart.module.scss';
import { Row, Col } from 'antd';
import emptyCart from '~/assets/Cart/emptyCart.png'
import Button from '~/components/Button/Button';
import CartProduct from '../../../layouts/public/CartProduct/CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import InputInformation from '~/layouts/public/InputInformation/InputInformation';
import { useState } from 'react';

export default function Cart() {
    const { current } = useSelector((state) => state.user);
    // console.log(current)
    const haveOrder = current?.cart?.length;
    const dispatch = useDispatch();
    const formattedCount = (numberValue) => Number(numberValue).toFixed(2);

    const totalPrice = formattedCount(current?.cart?.reduce((acc, item) => {
        return acc + item?.quantity * item?.product?.price;
    }, 0));

    const [nameValue, setNameValue] = useState(current?.name);
    const handleNameChange = (event) => {
        setNameValue(event.target.value)
    }

    const [emailValue, setEmailValue] = useState(current?.email);
    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const [phoneValue, setPhoneValue] = useState('0308217772');
    const handlePhoneChange = (event) => {
        setPhoneValue(event.target.value)
    }

    const [addressValue, setAddressValue] = useState('Dai hoc cong nghe thong tin');
    const handleAddressChange = (event) => {
        setAddressValue(event.target.value)
    }

    const isDisabled = (current?.cart?.length <= 0) ? true : false;


    return <>
        <Row style={{ margin: '70px 0 10px 50px', color: '#000', fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'center' }} col={3}>
            Cart
        </Row>
        <Row style={{ minHeight: '550px', margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>


            <div style={{ width: '100%' }}>
                <section className={styles.titleType}>
                    <h3>Product Details</h3>
                    <div className={styles.titleOrder}>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                        <h3>Total</h3>
                    </div>
                </section>
                {/* <hr /> */}
                <div style={{ display: 'flex' }}>
                    <Col span={16}>
                        <section className="p-5">
                            {(haveOrder > 0) ? (
                                <>
                                    {current?.cart?.map((item, index) => (
                                        <CartProduct
                                            key={`${item?.product?._id} - ${item?.color}`}
                                            pid={item?.product?._id}
                                            title={item?.product?.title}
                                            color={item?.color}
                                            quantity={item?.quantity}
                                            size={item?.product?.size}
                                            price={item?.product?.price}
                                            thumbnail={item?.product?.thumbnail}
                                            dispatch={dispatch}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'block', height: '450px', margin: 'auto', fontSize: '18px', textAlign: 'center' }}>
                                        <img src={emptyCart} alt="Empty Cart" />
                                    </div>
                                </>)}

                        </section>
                    </Col>
                    <Col className='p-5' span={8}>
                        <form className={`${styles.checkOut} p-5`}>
                            <h1>User Delivery Information</h1>
                            <input value={nameValue} type="text" placeholder='FullName...' onChange={handleNameChange} />
                            <input value={phoneValue} type="tel" placeholder='Phone number...' onChange={handlePhoneChange} />
                            <input value={emailValue} type="email" placeholder='Email...' onChange={handleEmailChange} />
                            <input value={addressValue} type="text" placeholder='Address...' onChange={handleAddressChange} />
                            <h1>Order Summary</h1>
                            <div className={`${styles.subTotal} ${styles.baseSub}`}>
                                <h1>Subtotal</h1>
                                <h3>$&nbsp;{totalPrice}</h3>
                            </div>
                            <div className={`${styles.shipFee} ${styles.baseSub}`}>
                                <h1>Shipping Fee</h1>
                                <h3 style={{ color: 'green', fontWeight: 'bold' }}>Free</h3>
                            </div>
                            <hr />
                            <div className={`${styles.estimateTotal} ${styles.baseSub}`}>
                                <h1>Estimate Total</h1>
                                <h3>$&nbsp;{totalPrice}</h3>
                            </div>
                            <Button disabled={isDisabled} link='/login' classParent={styles.btnParentCheck} classChild={styles.btnCheckout} content='Check Out' />
                        </form>
                    </Col>
                </div>
            </div>
        </Row >
    </>;
}
