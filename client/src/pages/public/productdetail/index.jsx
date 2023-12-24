import React from 'react'
import styles from './ProductDetail.module.scss'
import { Row, Col } from 'antd';
import imgDetail from '../assets/ImgBestSeller/Shoe.jpeg'
import absCeil from '../../../../node_modules/moment/src/lib/utils/abs-ceil';
import Star from '~/components/Star/Star';
import Counter from '~/components/Counter/Counter';
import Button from '~/components/Button/Button';

export default function ProductDetail() {
    return (
        <>
            <Row style={{ margin: '70px 0 10px 50px', color: '#999', fontWeight: '500', fontSize: '18px' }} col={3}>
                Home &gt; Product Detail
            </Row>
            <Row style={{ margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col span={10}>
                    <section className={styles.imgDetail}>
                        <img src={imgDetail} alt="IMG Detail" />
                    </section>
                    <section className={styles.listImgDetail}>
                        <div className={styles.imgDetail1}>
                            <img src={imgDetail} alt="IMG Detail" />
                        </div>
                        <div className={styles.imgDetail2}>
                            <img src={imgDetail} alt="IMG Detail" />
                        </div>
                        <div className={styles.imgDetail3}>
                            <img src={imgDetail} alt="IMG Detail" />
                        </div>
                        <div className={styles.imgDetail4}>
                            <img src={imgDetail} alt="IMG Detail" />
                        </div>
                    </section>
                </Col>
                <Col className='p-5' span={14}>
                    <section className={styles.productName}>
                        pH5.5 Jelly Mask Pack - Soothing (10EA)
                    </section>
                    <section className={styles.rateStar}>
                        <Star rate={4} classParrent={styles.star} /> (3000)
                    </section>
                    <section className={styles.productPrice}>
                        <div className={styles.newPrice}>
                            $30
                        </div>
                        <div className={styles.prevPrice}>
                            $60
                        </div>
                    </section>
                    <section className={styles.productInfo}>
                        <h3>Availability: <p className={styles.firstP}>In Stock</p></h3>
                        <h3>Brand: <p>In Stock</p></h3>
                        <h3>Category: <p>In Stock</p></h3>
                        <p className={styles.productDescription}>Welcome to 4Best SHOP, where your shopping experience is elevated to a whole new level! Dive into a world of unparalleled variety and quality, curated just for you. Discover the latest trends, must-have essentials, and exclusive deals that redefine your shopping journey. Join us in exploring a realm of style, convenience, and exceptional value. Happy shopping at 4Best SHOP – where excellence meets your every need!</p>
                    </section>
                    <section className={styles.productColor}>
                        <h1>SELECT COLOR</h1>
                        <div className={styles.listColor}>
                            <label className={styles.container}>
                                <input type="radio" name='color' />
                                <span className={`${styles.firstColor} ${styles.checkmark}`}></span>
                            </label>
                            <label className={styles.container}>
                                <input type="radio" name='color' />
                                <span className={`${styles.secondColor} ${styles.checkmark}`}></span>
                            </label>
                            <label className={styles.container}>
                                <input type="radio" name='color' />
                                <span className={`${styles.thirdColor} ${styles.checkmark}`}></span>
                            </label>
                        </div>
                    </section>
                    <section className={styles.quantity}>
                        <div className={styles.title}>QUANTITY</div>
                        <Counter />
                    </section>
                    <section className={styles.btnAdd}>
                        <Button classParent={styles.customBtn} content='Add to Cart' />
                    </section>
                </Col>
            </Row>
        </>
    )
}
