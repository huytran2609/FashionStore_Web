import styles from './Colors.module.scss';
import Input from '~/components/input';

export default function Colors({ handleChange }) {
    return (
        <div className={styles.colorsContainer}>
            <h2 className={`${styles.sidebarTitle} ${styles.colorTitle}`}>Colors</h2>
            <label className={styles.sidebarLabelContainer}>
                <input onChange={handleChange} type="radio" value="" name="test3" />
                <span className={`${styles.checkmark} ${styles.all}`}></span>All
            </label>

            <Input handleChange={handleChange} value="black" title="Black" name="test3" color="black" />
            <Input handleChange={handleChange} value="blue" title="Blue" name="test3" color="blue" />
            <Input handleChange={handleChange} value="red" title="Red" name="test3" color="red" />
            <Input handleChange={handleChange} value="green" title="Green" name="test3" color="green" />
        </div>
    );
}

