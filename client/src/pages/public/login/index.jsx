import styles from './Login.module.scss'
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function index() {
    return (
        <div className={styles.bodyLogin}>
            <div className={styles.wrapper}>
                <form action="">
                    <h1>Login</h1>
                    <div className={styles.inputBox}>
                        <input type="text" placeholder='Enter the Username . . .' required />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder='Enter the Password . . .' required />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles.rememberForgot}>
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type='submit'>Login</button>
                    <div className={styles.registerLink}>
                        <p>Don't have an account?<Link to="/register"> Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
