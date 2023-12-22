import styles from './Header.module.scss';
import { Row, Col } from 'antd';
import Logo from '~/assets/Logo/Logo_grey.svg';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import Button from '~/components/Button/Button';
import config from '~/config';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
        };
        fetchApiCategories();
    }, []);

    return (
        <>
            <Row className={styles.header}>
                <Col span={3} className={styles.logo}>
                    <Link to={config.home}>
                        <img src={Logo} alt="Logo" />
                    </Link>
                </Col>
                <div className={styles.lineHeader}></div>
                <Col span={11} className={styles.category}>
                    <ul className={styles.categoryList}>
                        {categories.map((data) =>
                            <Link to={config[data.title.toLowerCase()]}>
                                <li key={data._id}>
                                    {data.title}
                                </li>
                            </Link>
                        )}
                    </ul>
                </Col>
                <Col className={styles.cpnHeader3} span={10}>
                    <div className={styles.headerSearch}>
                        <FaSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Enter to Search ..." className={styles.searchInput} />
                    </div>

                    <div className={styles.cart}>
                        <FaShoppingCart className={styles.cartIcon} />
                    </div>

                    <Button link={config.login} content="Login" />

                    <Button link={config.register} content="Register" />
                </Col>
            </Row>
        </>
    );
}
