import { FaStar } from "react-icons/fa";
import styles from './Star.module.scss'

export default function Star({ rate, classParrent, classChild }) {
    const totalStars = 5;
    const filledStars = Math.min(rate, totalStars);
    return (
        <>
            <div className={`${styles.star} ${classParrent}`}>
                {[...Array(totalStars)].map((star, index) => (
                    <FaStar key={index} color={index < filledStars ? "#F7F646" : "gray"} className={`${styles.starChild} ${classChild}`} />
                ))}
            </div>
        </>
    )
}

