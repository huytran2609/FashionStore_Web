import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '~/config';
import { apiLogin } from '~/apis/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/features/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [payload, setPlayload] = useState({
        email: '',
        password: '',
    });

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [payload.email, payload.password]);

    const handleSubmit = async () => {
        const { email, password } = payload;
        if (!email || !password) {
            toast.error('Please enter all fields');
            return;
        }
        // const response = await apiLogin(payload);
        // if (response.success) {
        //     dispatch(login({ isLoggedIn: true, userData: response.userData, token: response.accessToken }));
        //     navigate(config.home);
        // } else {
        //     toast.error('Failure', response.mes, 'error');
        // }

        try {
            const response = await apiLogin(payload);
            if (response.success) {
                // toast.success("Logged in Successfully!");
                dispatch(login({ isLoggedIn: true, userData: response.userData, token: response.accessToken }));

                await new Promise(resolve => setTimeout(resolve, 100));
                navigate(config.home);
            } else {
                toast.error('Failure', response.mes, 'error');
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className={styles.bodyLogin}>
            <div className={styles.wrapper}>
                <p className={errMsg ? styles.errMsg : styles.offScreen} aria-live="assertive">
                    {errMsg}
                </p>
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
            <ToastContainer />
        </div>
    );
}
