import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function Button({ onSubmit, ref, onClick, link, content, classParent, classChild, cart, disabled }) {
    return <>
        <div onSubmit={onSubmit} ref={ref} onClick={onClick} className={`${disabled ? styles.classDisable : ''} ${styles.btn} ${classParent}`}>
            {disabled ? (
                <div className={`${styles.btnLink} ${classChild} ${styles.disabled}`}>{cart ? <FaShoppingCart className={styles.cartIcon} /> : ""}{content}</div>
            ) : (
                <Link className={`${styles.btnLink} ${classChild}`} to={link}>{cart ? <FaShoppingCart className={styles.cartIcon} /> : ""}{content}</Link>
            )}
        </div>
    </>;
}
