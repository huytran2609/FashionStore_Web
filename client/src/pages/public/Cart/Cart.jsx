import styles from './Cart.module.scss';
import { Row, Col } from 'antd';
import emptyCart from '~/assets/Cart/emptyCart.png';
import Button from '~/components/Button/Button';
import CartProduct from '../../../layouts/public/CartProduct/CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Address from '~/components/Address';
import { apiCreateOrder } from '~/apis/order';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Cart() {
    const { current, currentCart, totalPrice } = useSelector((state) => state.user);

    // console.log(current);
    const haveOrder = currentCart?.length;
    const dispatch = useDispatch();
    const formattedCount = (numberValue) => Number(numberValue).toFixed(2);

    const estimatePrice = formattedCount(
        currentCart?.reduce((acc, item) => {
            return acc + item?.quantity * item?.product?.price;
        }, 0),
    );

    const [nameValue, setNameValue] = useState(current?.name);
    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };

    const [emailValue, setEmailValue] = useState(current?.email);
    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    };

    const [phoneValue, setPhoneValue] = useState('0308217772');
    const handlePhoneChange = (event) => {
        setPhoneValue(event.target.value);
    };
    const [addressDefault, setAddressDefault] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const isDisabled = currentCart?.length <= 0 ? true : false;
    console.log(isDisabled)
    const handleAddressChange = (event) => {
        setAddressValue(event.target.value);
    };

    // console.log(addressDefault);
    const validateEmail = (email) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };
    const form = useRef();

    const handleCheckOut = async (e) => {
        e.preventDefault();
        if (!nameValue || !phoneValue || !emailValue || !addressValue || !addressDefault) {
            toast.error('Lack of information to delivery');
            return;
        }
        if (!validatePhone(phoneValue)) {
            toast.error('Invalid phone number');
            return;
        }
        if (!validateEmail(emailValue)) {
            toast.error('Invalid email format');
            return;
        }
        const response = await apiCreateOrder({
            products: currentCart,
            totalPrice: formattedCount(totalPrice),
            phone: phoneValue,
            address: `${addressValue}, ${addressDefault}`,
        });


        // console.log(response);
        // if (totalPrice === 0 || estimatePrice === 0) {
        //     toast.error("Please add some products to your cart");
        //     return;
        // }
        if (response.success) {

            emailjs.sendForm('service_0hirvyh', 'template_ypt2vbd', form.current, 'Zuy7iE_yJXzm4f2rZ')
                .then((result) => {
                    window.location.reload();
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            // form.current.reset()
            toast.success('Create Order Successfully!');
            dispatch(current);
        } else {
            toast.error(response.mes);
        }
    };



    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('service_0hirvyh', 'template_ypt2vbd', form.current, 'Zuy7iE_yJXzm4f2rZ')
    //         .then((result) => {
    //             console.log(result.text);
    //         }, (error) => {
    //             console.log(error.text);
    //         });
    //     e.target.reset()
    // };

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
                                {haveOrder > 0 ? (
                                    <>
                                        {currentCart?.map((item, index) => (
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
                                        <div
                                            style={{
                                                display: 'block',
                                                height: '450px',
                                                margin: 'auto',
                                                fontSize: '18px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <img src={emptyCart} alt="Empty Cart" />
                                        </div>
                                    </>
                                )}
                            </section>
                        </Col>
                        <Col className="p-5" span={8}>
                            <form ref={form} onSubmit={handleCheckOut} className={`${styles.checkOut} p-5`}>
                                <h1>User Delivery Information</h1>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    value={nameValue}
                                    name="nameValue"
                                    type="text"
                                    placeholder="FullName..."
                                    onChange={handleNameChange}
                                />
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    value={phoneValue}
                                    type="tel"
                                    name="phoneValue"
                                    placeholder="Phone number..."
                                    onChange={handlePhoneChange}
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    value={emailValue}
                                    name="emailValue"
                                    type="email"
                                    placeholder="Email..."
                                    onChange={handleEmailChange}
                                />
                                <Address name="addressValue" setAddressDefault={setAddressDefault} />
                                <label>Specific Address</label>
                                <input
                                    value={addressValue}
                                    name="addressSpecificValue"
                                    type="text"
                                    placeholder="Address..."
                                    onChange={handleAddressChange}
                                />
                                <h1>Order Summary</h1>
                                <div className={`${styles.subTotal} ${styles.baseSub}`}>
                                    <h1>Subtotal</h1>
                                    <h3>$&nbsp;{totalPrice ? formattedCount(totalPrice) : estimatePrice}</h3>
                                    {/* <h3>$&nbsp;{estimatePrice}</h3> */}
                                </div>
                                <div className={`${styles.shipFee} ${styles.baseSub}`}>
                                    <h1>Shipping Fee</h1>
                                    <h3 style={{ color: 'green', fontWeight: 'bold' }}>Free</h3>
                                </div>
                                <hr />
                                <div className={`${styles.estimateTotal} ${styles.baseSub}`}>
                                    <h1>Estimate Total</h1>
                                    <h3>$&nbsp;{totalPrice ? formattedCount(totalPrice) : estimatePrice}</h3>
                                    {/* <h3>$&nbsp;{estimatePrice}</h3> */}
                                </div>
                                <input type="hidden" value={totalPrice ? formattedCount(totalPrice) : estimatePrice} name="priceValue" />
                                <Button
                                    onClick={handleCheckOut}
                                    disabled={isDisabled}
                                    classParent={styles.btnParentCheck}
                                    classChild={styles.btnCheckout}
                                    content="Check Out"
                                />
                            </form>
                        </Col>
                    </div>
                </div>
            </Row>
        </>
    );
}
