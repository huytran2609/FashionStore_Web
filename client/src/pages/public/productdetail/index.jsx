import React from 'react'
import styles from './ProductDetail.module.scss'
import { Row, Col } from 'antd';
import Star from '~/components/star';
import Counter from '~/components/counter';
import Button from '~/components/button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProductDetail } from '~/apis/products';
import { useFetch } from '~/hooks';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '~/redux/features/slices/asyncActions'
import { apiCart } from '~/apis/user'
import { toast } from 'react-toastify'
import Comments from '~/layouts/public/comments';
import config from '~/config';
import { Link } from 'react-router-dom';


export default function ProductDetail() {
    const { id, title } = useParams();
    
    const { data: productResponse } = useFetch(() => getProductDetail(id), {
        dependencies: [id],
    });
    
    const productData = productResponse?.productData || {};
    const [colorValue, setColorValue] = useState('DefaultColor');

    // Code 1 random comment rate tu 1k cmt -> 5k
    const randomCmt = Math.ceil(Math.random() * 4000 + 1000);

    const { isLoggedIn, current } = useSelector((state) => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = async () => {
        if (!isLoggedIn) {
            navigate('/login', { state: location?.pathname })
        } else {
            const response = await apiCart({ pid: id, color: colorValue, quantity: counter })
            if (response.success) {
                toast.success(response.mes)
                dispatch(getCurrent())
            }
        }
    }

    const handleColor = (event) => {
        setColorValue(event.target.value);
    }

    const [counter, setCounter] = useState(1);
    const handleCounter = (newCounter) => {
        setCounter(newCounter)
    }

    return (
        <>
            <Row className={styles.breadcrumb} col={3}>
                <Link to={config.home}>Home</Link> &nbsp;&gt;&nbsp; <Link to={config.category}>Category</Link> &nbsp;&gt;&nbsp; Product Detail &nbsp;&gt;&nbsp; {title}
            </Row>
            <Row className={styles.productContainer} col={9}>
                <Col span={10}>
                    <section className={styles.imgDetail}>
                        <img className={styles.productImage} src={productData.thumbnail} alt="IMG Detail" />
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
                        <Star rate={4} classParrent={styles.star} /> (4293)
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
                        <h3>Availability: <p className={styles.firstP}>In Stock</p> <span className={styles.availabilityText}>&nbsp;({productData.quantity})</span></h3>
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
                                        <input onClick={handleColor} value={color ? color : 'Pink'} type="radio" name='color' />
                                        {/* {console.log(color)} */}
                                        <span style={{ '--color': color ? color : '#E280AD' }} className={`${styles.firstColor} ${styles.checkmark2} ${styles.colorSwatch}`}></span>
                                    </label>
                                ))
                                :
                                (
                                    <>
                                        <label className={styles.container}>
                                            <input onClick={handleColor} value='Pink' type="radio" name='color' />
                                            <span className={`${styles.firstColor} ${styles.checkmark} ${styles.colorSwatchDefault}`}></span>
                                        </label>
                                        <label className={styles.container}>
                                            <input onClick={handleColor} value='Black' type="radio" name='color' />
                                            <span className={`${styles.secondColor} ${styles.checkmark} ${styles.colorSwatchDefault}`}></span>
                                        </label>
                                        <label className={styles.container}>
                                            <input onClick={handleColor} value='Red' type="radio" name='color' />
                                            <span className={`${styles.thirdColor} ${styles.checkmark} ${styles.colorSwatchDefault}`}></span>
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
                <Comments
                    commentsUrl="http://127.0.0.1:5173/comments"
                    currentUserId="1"
                />
            </Row>
        </>
    )
}
