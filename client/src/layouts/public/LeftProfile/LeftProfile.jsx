import styles from './LeftProfile.module.scss'
import avatar from '~/assets/Avatar/avatarUser.jpg';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FaHistory, FaUserCircle } from "react-icons/fa";

export default function LeftProfile() {
    const handleChange = (evt) => {
        const [file] = imgInp.files
        if (file) {
            imgAva.src = URL.createObjectURL(file)
        }
    }
    return (
        <>
            <div className={styles.avataUser}>
                <div className={styles.imgAva}>
                    <img id="imgAva" src={avatar} alt="IMG AVATAR" />
                </div>
                <form runat="server">
                    <input onChange={handleChange} accept="image/*" type='file' id="imgInp" />
                </form>
            </div>
            <Link to={config.profile} className={styles.userInfo}>
                <FaUserCircle className={styles.icon} />
                <h1>User Information</h1>
            </Link>
            <Link to={config.history} className={styles.userInfo}>
                <FaHistory className={`${styles.history} ${styles.icon}`} />
                <h1>Order History</h1>
            </Link>
        </>
    )
}
