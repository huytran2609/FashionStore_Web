import React, { useState } from 'react';
import styles from './Counter.module.scss';

export default function Counter() {
    const [count, setCount] = useState(1);

    const increaseCount = () => setCount((prevCount) => prevCount + 1);

    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    }

    return (
        <>
            <div className={styles.counter}>
                <span className={styles.down} onClick={decreaseCount}>-</span>
                <input type="text" value={count} readOnly />
                <span className={styles.up} onClick={increaseCount}>+</span>
            </div>
        </>
    );
}
