import React from 'react'
import styles from './ProductDetail.module.scss'
import { Row, Col } from 'antd';
import Star from '~/components/Star/Star';
import Counter from '~/components/Counter/Counter';
import Button from '~/components/Button/Button';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductDetail } from '~/apis/products';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '~/redux/features/slices/asyncActions'
import { apiCart } from '~/apis/user'
import { toast } from 'react-toastify'

export default function ProductDetail() {
    const { id, title } = useParams();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductDetail(id);
            // console.log(response)
            setProductData(response.productData);
        };
        fetchProduct(id);
    }, []);

    // Code 1 random comment rate tu 1k cmt -> 5k
    const randomCmt = Math.ceil(Math.random() * 4000 + 1000);

    const { isLoggedIn, current } = useSelector((state) => state.user);
    const location = useLocation();
    // console.log(location)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!isLoggedIn) {
            navigate('/login', { state: location?.pathname })
        } else {
            const response = await apiCart({ pid: id, color: (productData?.color)[0], quantity: counter })
            if (response.success) {
                toast.success(response.mes)
                dispatch(getCurrent())
            }
        }
        console.log(current)
    }

    const colorString = current.cart.map((cart) => cart.color[0]).toString();
    // console.log(productData.color);

    const [counter, setCounter] = useState(1);
    const handleCounter = (quantity) => {
        setCounter(quantity)
    }

    return (
        <>
            <Row style={{ margin: '70px 0 10px 50px', color: '#999', fontWeight: '500', fontSize: '18px' }} col={3}>
                Home &gt; Product Detail &gt; {title}
            </Row>
            <Row style={{ margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col span={10}>
                    <section className={styles.imgDetail}>
                        <img src={productData.thumbnail} alt="IMG Detail" />
                    </section>
                    <section className={styles.listImgDetail}>
                        {productData?.images?.slice(1, 6)?.map((title, index) => {
                            return (
                                <div key={index} className={styles.imgDetail1}>
                                    <img src={title} alt="IMG Detail" />
                                </div>

                            )
                        })}
                    </section>
                </Col>
                <Col className='p-5' span={14}>
                    <section className={styles.productName}>
                        {title}
                    </section>
                    <section className={styles.rateStar}>
                        <Star rate={4} classParrent={styles.star} /> ({randomCmt})
                    </section>
                    <section className={styles.productPrice}>
                        <div className={styles.newPrice}>
                            &#36;{productData.price}
                        </div>
                        <div className={styles.prevPrice}>
                            &#36;{productData.price * 8}
                        </div>
                    </section>
                    <section className={styles.productInfo}>
                        <h3>Availability: <p className={styles.firstP}>In Stock</p> <span style={{ fontWeight: '400' }}>&nbsp;({productData.quantity})</span></h3>
                        <h3>Brand: <p>{productData.brand}</p></h3>
                        <h3>Category: <p>{productData.category}</p></h3>
                        <p className={styles.productDescription}>{productData.description}</p>
                    </section>
                    <section className={styles.productColor}>
                        <h1>SELECT COLOR</h1>
                        <div className={styles.listColor}>

                            {(productData?.color != 0) ?
                                (productData?.color || []).map((color) => (
                                    <label key={color} className={styles.container}>
                                        <input value={color ? color : 'pink'} type="radio" name='color' />
                                        {console.log(color)}
                                        <span style={{ backgroundColor: `${color ? color : '#E280AD'}`, border: '0.5px solid rgba(0, 0, 0, 0.25)', boxShadow: '0.49px 1.958px 4.958px rgba(0, 0, 0, 0.25)' }} className={`${styles.firstColor} ${styles.checkmark2}`}></span>
                                    </label>
                                ))
                                :
                                (
                                    <>
                                        <label className={styles.container}>
                                            <input value='pink' type="radio" name='color' />
                                            <span style={{ border: '1px solid transparent', boxShadow: '0.49px 1.958px 4.958px rgba(0, 0, 0, 0.25)' }} className={`${styles.firstColor} ${styles.checkmark}`}></span>
                                        </label>
                                        <label className={styles.container}>
                                            <input value='black' type="radio" name='color' />
                                            <span style={{ border: '1px solid transparent', boxShadow: '0.49px 1.958px 4.958px rgba(0, 0, 0, 0.25)' }} className={`${styles.secondColor} ${styles.checkmark}`}></span>
                                        </label>
                                        <label className={styles.container}>
                                            <input value='red' type="radio" name='color' />
                                            <span style={{ border: '1px solid transparent', boxShadow: '0.49px 1.958px 4.958px rgba(0, 0, 0, 0.25)' }} className={`${styles.thirdColor} ${styles.checkmark}`}></span>
                                        </label>
                                    </>
                                )
                            }
                        </div>
                    </section>
                    <section className={styles.quantity}>
                        <div className={styles.title}>QUANTITY</div>
                        <Counter pid={productData._id} quantity={counter} handleChangeQuantity={handleCounter} />
                    </section>
                    <section className={styles.btnAdd}>
                        <Button onClick={handleClick} classParent={styles.customBtn} content='Add to Cart' />
                    </section>
                </Col>
            </Row>
        </>
    )
}
