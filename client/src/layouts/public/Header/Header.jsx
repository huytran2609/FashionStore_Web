import styles from './Header.module.scss';
import { Row, Col } from 'antd';
import Logo from '../../../assets/Logo/Logo_grey.svg';
import { FaSearch } from "react-icons/fa";
import Button from '~/components/Button/Button';

export default function Header() {
    return (
        <>
            <Row className={styles.header}>
                <Col span={3} className={styles.logo}>
                    <img src={Logo} alt="Logo" />
                </Col>
                <div className={styles.lineHeader}></div>
                <Col span={11} className={styles.category}>
                    <ul className={styles.categoryList}>
                        <li>Sneakers</li>
                        <li>Flats</li>
                        <li>Nike</li>
                        <li>Man</li>
                        <li>Woman</li>
                    </ul>
                </Col>
                <Col className={styles.cpnHeader3} span={10}>
                    <div className={styles.headerSearch}>
                        <FaSearch className={styles.searchIcon} />
                        <input type="text" placeholder='Enter to Search ...' className={styles.searchInput} />
                    </div>

                    <Button link="Login" content="Login" />

                    <Button link="Register" content="Register" />
                </Col>
            </Row>
        </>
    );
}
