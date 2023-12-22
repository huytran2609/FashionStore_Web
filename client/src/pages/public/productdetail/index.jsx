import React from 'react'
import styles from './ProductDetail.module.scss'
import { Row, Col } from 'antd';
import imgDetail from '../assets/ImgBestSeller/Shoe.jpeg'

export default function ProductDetail() {
    return (
        <>
            <Row style={{ margin: '70px 0 10px 50px', color: '#999', fontWeight: '500', fontSize: '18px' }} col={3}>
                Home &gt; Product Detail
            </Row>
            <Row style={{ margin: '0px 50px 10px 50px', backgroundColor: '#fff', boxShadow: '0.49px 0.958px 3.958px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }} col={9}>
                <Col span={10}>
                    <div className={styles.imgDetail}>
                        <img src={imgDetail} alt="IMG Detail" />
                    </div>
                    <div className={styles.listImgDetail}>
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
                    </div>
                </Col>
                <Col span={14}>
                    <Row>
                        <Col style={{ height: '60px' }} span={24}>

                        </Col>
                        <Col style={{ height: '90px' }} span={24}>

                        </Col>
                        <Col className={styles.productCategory} span={24}>
                            <div className='grid grid-cols-4 gap-4'>

                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
