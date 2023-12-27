import styles from './Register.module.scss';
import config from '~/config';
import { IoMdMail } from 'react-icons/io';
import { FaUser, FaLock, FaInfoCircle, FaRegTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { apiRegister } from '~/apis/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [payload, setPayload] = useState({
        email: '',
        name: '',
        password: '',
    });

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(payload.name);
        // console.log(result);
        // console.log(payload.name);
        setValidName(result);
    }, [payload.name]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(payload.email);
        setValidEmail(result);
    }, [payload.email]);

    useEffect(() => {
        const result = PWD_REGEX.test(payload.password);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = payload.password === matchPwd;
        setValidMatch(match);
    }, [payload.password, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [payload.name, payload.email, payload.password, matchPwd]);

    // const handleSubmit = async () => {
    //     const { name, email, password } = payload;
    //     if (!name || !email || !password) {
    //         setErrMsg('Please enter all fields');
    //         return;
    //     }
    //     if (!validName || !validPwd || !validMatch || !validEmail ? true : false) {
    //         setErrMsg('Please enter the correct information');
    //         return;
    //     }
    //     const response = await apiRegister(payload);
    //     if (response.success) {
    //         Swal.fire('Congratulation', response.mes, 'success').then(() => {
    //             //logic
    //             setPayload({
    //                 email: '',
    //                 name: '',
    //                 password: '',
    //             });
    //         });
    //     }
    //     else {
    //         Swal.fire('Failure', response.mes, 'error');
    //     }
    // };

    const handleSubmit = async () => {
        const { name, email, password } = payload;

        if (!name || !email || !password) {
            // setErrMsg('Please enter all fields');
            toast.error('Please enter all fields');
            return;
        }

        if (!validName || !validPwd || !validMatch || !validEmail) {
            // setErrMsg('Please enter the correct information');
            toast.error('Please enter the correct information');
            return;
        }

        try {
            const response = await apiRegister(payload);

            if (response.success) {
                toast.success(response.mes, { onClose: handleSuccess });
            } else {
                toast.error(response.mes);
            }
        } catch (error) {
            toast.error('An unexpected error occurred!!!');
        }
    };

    const handleSuccess = () => {
        // Thêm logic sau khi đăng ký thành công
        setPayload({
            email: '',
            name: '',
            password: '',
        });
        setMatchPwd('');
    };

    return (
        <>
            <section className={styles.bodyRegister}>
                <div className={styles.wrapper}>
                    <p ref={errRef} className={errMsg ? styles.errMsg : styles.offScreen} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Register</h1>

                    <div className={styles.inputBox}>
                        <span className={validName ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validName || !payload.name ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="text"
                            id="userName"
                            ref={userRef}
                            autoComplete="off"
                            value={payload.name}
                            onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter the Full Name . . ."
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required
                        />

                        <FaUser className={styles.icon} />
                    </div>

                    <p
                        id="uidnote"
                        className={userFocus && payload.name && !validName ? styles.instructions : styles.offScreen}
                    >
                        <FaInfoCircle />
                        4 to 24 character. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <div className={styles.inputBox}>
                        <span className={validEmail ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validEmail || !payload.email ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            value={payload.email}
                            onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            placeholder="Enter the Email . . ."
                            required
                        />

                        <IoMdMail className={styles.icon} />
                    </div>

                    <p
                        id="emailnote"
                        className={emailFocus && payload.email && !validEmail ? styles.instructions : styles.offScreen}
                    >
                        <FaInfoCircle />
                        Your email must be in a valid format.
                    </p>

                    <div className={styles.inputBox}>
                        <span className={validPwd ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validPwd || !payload.password ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={payload.password}
                            onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder="Enter the Password . . ."
                            required
                        />

                        <FaLock className={styles.icon} />
                    </div>

                    <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number and a special character.
                        <br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <div className={styles.inputBox}>
                        <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="password"
                            id="confirmPassword"
                            autoComplete="off"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder="Enter the Confirm Password . . ."
                            required
                        />

                        <FaLock className={styles.icon} />
                    </div>

                    <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        Must match the first password input field.
                    </p>

                    <div className={styles.rememberForgot}>
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button
                        // disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>
                    <div className={styles.loginLink}>
                        <p>
                            Have an account?<Link to={config.login}> Login</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
