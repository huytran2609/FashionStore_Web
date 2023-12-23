import { useState } from 'react';
import styles from './Login.module.scss';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '~/config';
import { apiLogin } from '~/apis/user';

export default function index() {
    const [payload, setPlayload] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async() => {
        const { email, password } = payload;
        const response = await apiLogin(payload)
        console.log(response);
    };

    return (
        <div className={styles.bodyLogin}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        placeholder="Enter the Username . . ."
                        required
                        value={payload.email}
                        onChange={(e) => setPlayload((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="password"
                        placeholder="Enter the Password . . ."
                        required
                        value={payload.password}
                        onChange={(e) => setPlayload((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <FaLock className={styles.icon} />
                </div>
                <div className={styles.rememberForgot}>
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>

                <button onClick={handleSubmit}>Login</button>
                <div className={styles.registerLink}>
                    <p>
                        Don't have an account?<Link to={config.register}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
