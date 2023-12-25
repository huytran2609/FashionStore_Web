import styles from './Cart.module.scss';
import { Row, Col } from 'antd';
import emptyCart from '~/assets/Cart/emptyCart.svg'

export default function Cart() {
    const haveOrder = true;
    return <>
        <Row style={{ margin: '70px 0 10px 50px', color: '#000', fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'center' }} col={3}>
            Cart
        </Row>
        <Row style={{ minHeight: '550px', margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>

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
                        <div style={{ display: 'flex' }}>
                            <Col span={16}>
                                abc
                            </Col>
                            <Col className='p-5' span={8}>
                                xyz
                            </Col>
                        </div>
                    </div>
                </>) :
                (<>
                    <div style={{ display: 'block', height: '450px', margin: 'auto', fontSize: '30px', textAlign: 'center' }}>
                        <h1 style={{ fontWeight: 'bold', color: '#666' }}>Your Cart is <strong style={{ color: 'red' }} >Empty!</strong></h1>
                        <img style={{ height: '100%' }} src={emptyCart} alt="Empty Cart" />
                    </div>
                </>)}
        </Row >
    </>;
}
