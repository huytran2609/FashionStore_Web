import styles from "./Register.module.scss"
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className={styles.bodyRegister}>
            <div className={styles.wrapper}>
                <form action="">
                    <h1>Register</h1>
                    <div className={styles.inputBox}>
                        <input type="text" placeholder='Enter the Full Name . . .' required />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="email" placeholder='Enter the Email . . .' required />
                        <IoMdMail className={styles.icon} />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder='Enter the Password . . .' required />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder='Enter the Confirm Password . . .' required />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles.rememberForgot}>
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type='submit'>Register</button>
                    <div className={styles.loginLink}>
                        <p>Have an account?<Link to="/login"> Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
