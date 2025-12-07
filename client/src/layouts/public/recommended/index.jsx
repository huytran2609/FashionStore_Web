import React from 'react';
import styles from './Recommended.module.scss';
import Buttons from '~/components/buttons';

export default function Recommended({ handleClick, productData }) {
    return (
        <>
            <h2 className={styles.recommendedTitle}>Recommended</h2>
            <div className={styles.recommendedFlex}>
                <Buttons className={styles.btns} onClickHandler={handleClick} value="" title="All Products" />
                {productData.map((data) =>
                    <Buttons key={data._id} className={styles.btns} onClickHandler={handleClick} value={data.title} title={data.title} />
                )}
            </div>
        </>
    );
}

