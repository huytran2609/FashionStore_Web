import styles from './Cart.module.scss';
import { Row, Col } from 'antd';
import emptyCart from '~/assets/Cart/emptyCart.svg';
import Button from '~/components/Button/Button';
import CartProduct from '../../../layouts/public/CartProduct/CartProduct';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
    const haveOrder = true;
    const dispatch = useDispatch();

    const { current } = useSelector((state) => state.user);

    return (
        <>
            <Row
                style={{
                    margin: '70px 0 10px 50px',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                col={3}
            >
                Cart
            </Row>
            <Row
                style={{
                    minHeight: '550px',
                    margin: '0px 50px 10px 50px',
                    backgroundColor: '#fff',
                    boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px',
                }}
                col={9}
            >
                {haveOrder ? (
                    <>
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
                                        {current?.cart?.map((item, index) => (
                                            <CartProduct
                                                key={`${item.product._id}-${index}`}
                                                pid = {item.product._id}
                                                title={item.product.title}
                                                color={item.color}
                                                quantity={item.quantity}
                                                size={item.product.size}
                                                price={item.product.price}
                                                thumbnail={item.product.thumbnail}
                                                dispatch={dispatch}
                                            />
                                        ))}
                                    </section>
                                </Col>
                                <Col className="p-5" span={8}>
                                    <form className={`${styles.checkOut} p-5`}>
                                        <h1>User Delivery Information</h1>
                                        <input type="text" placeholder="FullName..." />
                                        <input type="tel" placeholder="Phone number..." />
                                        <input type="email" placeholder="Email..." />
                                        <input type="text" placeholder="Address..." />
                                        <h1>Order Summary</h1>
                                        <div className={`${styles.subTotal} ${styles.baseSub}`}>
                                            <h1>Subtotal</h1>
                                            <h3>$&nbsp;4444</h3>
                                        </div>
                                        <div className={`${styles.shipFee} ${styles.baseSub}`}>
                                            <h1>Shipping Fee</h1>
                                            <h3 style={{ color: 'green', fontWeight: 'bold' }}>Free</h3>
                                        </div>
                                        <hr />
                                        <div className={`${styles.estimateTotal} ${styles.baseSub}`}>
                                            <h1>Estimate Total</h1>
                                            <h3>$&nbsp;4444</h3>
                                        </div>
                                        <Button
                                            link="/login"
                                            classParent={styles.btnParentCheck}
                                            classChild={styles.btnCheckout}
                                            content="Check Out"
                                        />
                                    </form>
                                </Col>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            style={{
                                display: 'block',
                                height: '450px',
                                margin: 'auto',
                                fontSize: '30px',
                                textAlign: 'center',
                            }}
                        >
                            <h1 style={{ fontWeight: 'bold', color: '#666' }}>
                                Your Cart is <strong style={{ color: 'red' }}>Empty!</strong>
                            </h1>
                            <img style={{ height: '100%' }} src={emptyCart} alt="Empty Cart" />
                        </div>
                    </>
                )}
            </Row>
        </>
    );
}
