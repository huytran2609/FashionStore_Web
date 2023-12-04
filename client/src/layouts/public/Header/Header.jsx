import styles from './Header.module.scss';
import { Row, Col } from 'antd';
import Logo from '../../../assets/Logo/Logo_grey.svg';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <Row className={styles.header}>
                <Col span={4} className={styles.logo}>
                    <img src={Logo} alt="Logo" />
                </Col>
                <Col span={10} className={styles.category}>
                    <ul className={styles.categoryList}>
                        <li>Sneakers</li>
                        <li>Flats</li>
                        <li>Nike</li>
                        <li>Man</li>
                        <li>Woman</li>
                    </ul>
                </Col>
                <Col span={10}>
                    <Link to="Login" >Login</Link>
                </Col>
            </Row>
        </>
    );
}
