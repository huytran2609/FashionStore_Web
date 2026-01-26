import styles from './Recommended.module.scss';
import Button from '~/components/button';

export default function Recommended({ handleClick, productData }) {
    return (
        <>
            <h2 className={styles.recommendedTitle}>Recommended</h2>
            <div className={styles.recommendedFlex}>
                <Button 
                    className={styles.btns} 
                    onClick={handleClick} 
                    value="" 
                    content="All Products"
                    type="button"
                />
                {productData.map((data) =>
                    <Button 
                        key={data._id} 
                        className={styles.btns} 
                        onClick={handleClick} 
                        value={data.title} 
                        content={data.title}
                        type="button"
                    />
                )}
            </div>
        </>
    );
}

