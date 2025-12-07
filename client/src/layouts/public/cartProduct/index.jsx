import styles from './CartProduct.module.scss';
import Counter from '~/components/counter';
import { FaRegTrashCan } from 'react-icons/fa6';
import { apiRemoveCart } from '~/apis/user';
import { getCurrent } from '~/redux/features/slices/asyncActions';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { updateCart } from '~/redux/features/slices/userSlice';

export default function CartProduct({ pid, title, color, quantity, size, price, thumbnail, dispatch }) {

    const [count, setCount] = useState(quantity);

    const handleChangeQuantity = (quantity) => {
        setCount(quantity);
        dispatch(updateCart({ pid, quantity, color })); 
    };

    const removeCart = async (pid, color) => {
        dispatch(updateCart({ pid, quantity: 0, color }));
        const response = await apiRemoveCart(pid, color && color);
        if (response.success) {
            dispatch(getCurrent());
        } else {
            toast.error(response.mes);
        }
    };
    const formattedCount = (numberValue) => Number(numberValue).toFixed(2);
    return (
        <div
            style={{
                display: 'flex',
                height: '120px',
                borderRadius: '20px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0.49px 0.458px 2.958px',
                marginBottom: '20px',
            }}
        >
            <div className={styles.imgCartPro}>
                <img src={thumbnail} alt="IMG" />
            </div>
            <div className={styles.cartProInfo}>
                <h1>{title}</h1>
                <h3>Color: {color ? color : 'DefaultColor'}</h3>
                <h3>Size: {size[0] || 'No size'}</h3>
            </div>
            <Counter
                pid={pid}
                quantity={quantity}
                color={color}
                classParent={styles.counter}
                handleChangeQuantity={handleChangeQuantity}
                dispatch = {dispatch}
            />
            <div className={styles.proPrice}>
                <h3>$&nbsp;{formattedCount(price)}</h3>
            </div>
            <div className={`${styles.totalPrice} ${styles.proPrice}`}>
                <h3>$&nbsp;{formattedCount(price * count)}</h3>
            </div>
            <div className={styles.removeCartProduct} onClick={() => removeCart(pid, color)}>
                <FaRegTrashCan />
            </div>
        </div>
    );
}

