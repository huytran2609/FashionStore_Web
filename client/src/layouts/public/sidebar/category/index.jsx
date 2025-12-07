import React from 'react';
import styles from './Category.module.scss';
import Input from '~/components/input';

export default function Category({ handleChange, productData }) {

    return (
        <div style={{ marginLeft: '-45px' }}>
            <h2 className={styles.sidebarTitle}>Category</h2>

            <div>
                <label className={styles.sidebarLabelContainer}>
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className={styles.checkmark}></span>All
                </label>
                {productData.map((data) =>
                    // <li key={data._id}>{data.title}</li>
                    <Input key={data._id} handleChange={handleChange} value={data.title} title={data.title} name="test" />
                )}
            </div>
        </div>
    );
}

