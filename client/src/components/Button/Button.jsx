import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function Button({ link, content, classParent, classChild, cart }) {
    return <>
        <div className={`${styles.btn} ${classParent}`}>
            <Link className={`${styles.btnLink} ${classChild}`} to={link} >{cart ? <FaShoppingCart className={styles.cartIcon} /> : ""}{content}</Link>
        </div>
    </>;
}
