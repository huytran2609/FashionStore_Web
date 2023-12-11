import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

export default function Button({ link, content, classParent, classChild }) {
    return <>
        <div className={`${styles.btn} ${classParent}`}>
            <Link className={`${styles.btnLink} ${classChild}`} to={link} >{content}</Link>
        </div>
    </>;
}
