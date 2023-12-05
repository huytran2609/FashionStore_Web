import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

export default function Button({ link, content }) {
    return <>
        <div className={styles.btn}>
            <Link className={styles.btnLink} to={link} >{content}</Link>
        </div>
    </>;
}
