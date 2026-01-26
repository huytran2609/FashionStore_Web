import styles from './Sidebar.module.scss';
import { TfiShoppingCart } from 'react-icons/tfi';
import Category from './category';
import Price from './price';
import Colors from './colors';

export default function Sidebar({ handleChange, productData }) {

    return (
        <>
            <section className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <h1>
                        <TfiShoppingCart />
                    </h1>
                </div>

                <Category handleChange={handleChange} productData={productData} />
                <Price handleChange={handleChange} />
                <Colors handleChange={handleChange} />
            </section>
        </>
    );
}

