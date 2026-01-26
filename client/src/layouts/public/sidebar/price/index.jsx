import styles from './Price.module.scss';
import Input from '~/components/input';

export default function Price({ handleChange }) {
    return (
        <div className={styles.priceContainer}>
            <h2 className={`${styles.sidebarTitle} ${styles.priceTitle}`}>Price</h2>
            <label className={styles.sidebarLabelContainer}>
                <input onChange={handleChange} type="radio" value="" name="test2" />
                <span className={styles.checkmark}></span>All
            </label>

            <Input handleChange={handleChange} value={50} title="$0 - $50" name="test2" />
            <Input handleChange={handleChange} value={100} title="$50 - $100" name="test2" />
            <Input handleChange={handleChange} value={150} title="$100 - $150" name="test2" />
            <Input handleChange={handleChange} value={200} title="Over $150" name="test2" />
        </div>
    );
}

