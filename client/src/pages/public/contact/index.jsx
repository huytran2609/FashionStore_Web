import { Link } from 'react-router-dom'
import styles from './Contact.module.scss'
import config from '~/config'
import { Row, Col } from 'antd';
import Button from '~/components/button';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
    const marker = {
        lat: 10.869986792191685,
        lng: 106.8009196148009
    };

    const markerStr = encodeURIComponent(JSON.stringify(marker));
    return (
        <>
            <section className={`mt-14 ${styles.sectionContact} ${styles.sectionContactHeight}`}>
                <h1 className='text-center pt-32'>ABOUT US</h1>
                <ol>
                    <li>
                        <Link to={config.home}>Home</Link>
                    </li>
                    <li>
                        <Link to={config.category}>Category</Link>
                    </li>
                    <li>
                        About Us
                    </li>
                </ol>
            </section>
            <section className={`${styles.info} ${styles.infoSection}`}>
                <div className={styles.infoContainer}>
                    <h1>Fun With Shopping</h1>
                    <p>4Best Shop is an online sports store that specializes in providing high-quality sportswear and equipment at competitive prices. We believe that everyone should have the opportunity to enjoy the benefits of a healthy and active lifestyle, regardless of their budget.

                        <br />    Our mission is to provide our customers with the best possible shopping experience. We offer a wide selection of products from top brands, including shoes, apparel, equipment, and accessories. We also offer a variety of convenient payment options and shipping methods to meet your needs.
                    </p>
                    <iframe
                        className={styles.iframeMap}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.240708485675!2d106.80305792211537!3d10.869986226366724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE2JzExLjYiTiAxMDrCsDIwJzIwLjMiRQ!5e0!3m2!1sen!2sbd!4v1694310939658!5m2!1sen!2sbd"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <Row className={styles.contactRow}>
                        <Col span={15}>
                            <input className={styles.baseInput} type="text" placeholder="Your Name ..." />
                            <input className={styles.baseInput} type="email" placeholder="Enter your email address..." />
                            <textarea className={`${styles.baseInput} ${styles.textareaInput}`} type="text" placeholder="Your Message ..." />
                            <Button classParent={styles.btnSend} content="Submit" />
                        </Col>
                        <Col span={9}>
                            <div className={styles.address}>
                                <FaLocationDot className={styles.icon} />
                                <div>
                                    <h1>Address</h1>
                                    <h3>University of Information Technology - UIT</h3>
                                </div>
                            </div>
                            <div className={styles.address}>
                                <IoMdMail className={styles.icon} />
                                <div>
                                    <h1>Mail US</h1>
                                    <h3>4best@shop.com</h3>
                                </div>
                            </div>
                            <div className={styles.address}>
                                <FaPhoneAlt className={styles.icon} />
                                <div>
                                    <h1>Phone US</h1>
                                    <h3>036912027</h3>
                                </div>
                            </div>

                        </Col>
                    </Row>


                </div>
            </section>
        </>
    )
}

