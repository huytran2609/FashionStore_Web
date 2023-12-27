import React, { useState } from 'react';
import styles from './Counter.module.scss';

export default function Counter({ classParent }) {
    const [count, setCount] = useState(1);

    const increaseCount = () => setCount((prevCount) => Number(prevCount) + 1);

    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => Number(prevCount) - 1);
        }
    }

    const handleInputChange = (e) => {
        setCount(e.target.value);
    };

    return (
        <>
            <div className={`${styles.counter} ${classParent}`}>
                <span className={styles.down} onClick={decreaseCount}>-</span>
                <input type="text" value={count} onChange={handleInputChange} />
                <span className={styles.up} onClick={increaseCount}>+</span>
            </div>
        </>
    );
}
