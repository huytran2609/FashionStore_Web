import styles from './CartProduct.module.scss'
import imgBest from '~/assets/Avatar/avatarUser.jpg'
import Counter from '~/components/Counter/Counter'
import { FaRegTrashCan } from "react-icons/fa6";

export default function CartProduct() {
    return (
        <div style={{ display: 'flex', height: '120px', borderRadius: '20px', boxShadow: 'rgba(0, 0, 0, 0.25) 0.49px 0.458px 2.958px', marginBottom: '20px' }}>
            <div className={styles.imgCartPro}>
                <img src={imgBest} alt="IMG" />
            </div>
            <div className={styles.cartProInfo}>
                <h1>Unisex Wool Basic Sleeve Coloration Varsity Jacket Boston Redsox Brown</h1>
                <h3>Color: red</h3>
                <h3>Size: 42</h3>
            </div>
            <Counter classParent={styles.counter} />
            <div className={styles.proPrice}>
                <h3>$&nbsp;5400</h3>
            </div>
            <div className={`${styles.totalPrice} ${styles.proPrice}`}>
                <h3>$&nbsp;5400</h3>
            </div>
            <div className={styles.removeCartProduct}>
                <FaRegTrashCan />
            </div>
        </div>
    )
}
