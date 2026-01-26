import { useEffect, useState } from 'react';
import styles from './Counter.module.scss';

export default function Counter({ quantity = 1, classParent, handleChangeQuantity }) {
    const [count, setCount] = useState(quantity);

    const increaseCount = () => setCount((prevCount) => Number(prevCount) + 1);

    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => Number(prevCount) - 1);
        }
    }

    useEffect(() => {
        handleChangeQuantity && handleChangeQuantity(count);
    }, [count, handleChangeQuantity])

    const handleInputChange = (e) => {
        setCount(Number(e.target.value));
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

