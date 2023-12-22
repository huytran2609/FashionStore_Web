import React from 'react';
import styles from './Recommended.module.scss';
import Buttons from '~/components/Buttons';

export default function Recommended({ handleClick }) {
    return (
        <>
            <h2 className={styles.recommendedTitle}>Recommended</h2>
            <div className={styles.recommendedFlex}>
                <Buttons className={styles.btns} onClickHandler={handleClick} value="" title="All Products" />
                <Buttons className={styles.btns} onClickHandler={handleClick} value="Nike" title="Nike" />
                <Buttons className={styles.btns} onClickHandler={handleClick} value="Adidas" title="Adidas" />
                <Buttons className={styles.btns} onClickHandler={handleClick} value="Puma" title="Puma" />
                <Buttons className={styles.btns} onClickHandler={handleClick} value="Vans" title="Vans" />
            </div>
        </>
    );
}
