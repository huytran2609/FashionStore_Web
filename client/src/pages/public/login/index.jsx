import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '~/config';
import { apiForgotPassword, apiLogin } from '~/apis/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/features/slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '~/components/modal';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

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
                dispatch(login({ isLoggedIn: true, userData: response.userData, token: response.accessToken }));

                await new Promise((resolve) => setTimeout(resolve, 100));
                if (+response.userData.role === 1) {
                    navigate(config.admin);
                } else if (location?.state) {
                    navigate(location?.state);
                } else {
                    navigate(config.home);
                }
            } else {
                toast.error(response.mes);
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login. Please try again later.');
        }
    };
    const [email, setEmail] = useState('');
    const handleForgotPassword = async() => {
        const response = await apiForgotPassword({ email });
        if(response.success) {
            toast.success(response.mes);
        }else {
            toast.error(response.mes);
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    <FaLock className={styles.icon} />
                </div>
                <div className={styles.rememberForgot}>
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a onClick={() => setIsOpen(true)} className="cursor-pointer">
                        Forgot password?
                    </a>
                </div>

                <button onClick={handleSubmit}>Login</button>
                <div className={styles.registerLink}>
                    <p>
                        Don't have an account?<Link to={config.register}>Register</Link>
                    </p>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false);
                }}
                title="Forgot Password"
                size="lg"
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="email" className="pl-1">
                        Enter your email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    <div className="flex items-center justify-end w-30">
                        <button
                            onClick={handleForgotPassword}
                            type="submit"
                            className="bg-blue-600 rounded-md border border-blue-600 text-white text-[0.875rem] w-25 p-2 hover:bg-blue-700 hover:text-white"
                        >
                            Send OTP
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
