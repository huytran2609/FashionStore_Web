import React from 'react';
import styles from './Category.module.scss';
import Input from '~/components/Input/Input';

export default function Category({ handleChange }) {
    return (
        <div style={{ marginLeft: '-45px' }}>
            <h2 className={styles.sidebarTitle}>Category</h2>

            <div>
                <label className={styles.sidebarLabelContainer}>
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className={styles.checkmark}></span>All
                </label>

                <Input handleChange={handleChange} value="sneakers" title="Sneakers" name="test" />
                <Input handleChange={handleChange} value="flats" title="Flats" name="test" />
                <Input handleChange={handleChange} value="sandals" title="Sandals" name="test" />
                <Input handleChange={handleChange} value="heels" title="Heels" name="test" />
            </div>
        </div>
    );
}
