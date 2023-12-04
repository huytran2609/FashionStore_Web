import styles from "./Register.module.scss"
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock, FaInfoCircle, FaRegTimesCircle, FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default function Register() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd]);


    return (
        <section className={styles.bodyRegister}>
            <div className={styles.wrapper}>
                <p ref={errRef} className={errMsg ? styles.errMsg : styles.offScreen} aria-live="assertive">{errMsg}</p>
                <form action="">
                    <h1>Register</h1>

                    <div className={styles.inputBox}>

                        <span className={validName ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validName || !user ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="text"
                            id="userName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => { setUser(e.target.value) }}
                            placeholder='Enter the Full Name . . .'
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required />

                        <FaUser className={styles.icon} />
                    </div>

                    <p id="uidnote"
                        className={userFocus && user && !validName ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        4 to 24 character. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <div className={styles.inputBox}>

                        <span className={validEmail ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validEmail || !email ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="email"
                            id="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            placeholder='Enter the Email . . .'
                            required />

                        <IoMdMail className={styles.icon} />
                    </div>

                    <p id="emailnote" className={emailFocus && email && !validEmail ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        Your email must be in a valid format.
                    </p>

                    <div className={styles.inputBox}>

                        <span className={validPwd ? styles.valid : styles.hide}>
                            <FaCheckCircle />
                        </span>

                        <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                            <FaRegTimesCircle />
                        </span>

                        <input
                            type="password"
                            id="password"
                            onChange={(e) => { setPwd(e.target.value) }}
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder='Enter the Password . . .'
                            required />

                        <FaLock className={styles.icon} />
                    </div>

                    <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
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
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder='Enter the Confirm Password . . .'
                            required />

                        <FaLock className={styles.icon} />
                    </div>

                    <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offScreen}>
                        <FaInfoCircle />
                        Must match the first password input field.
                    </p>

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
        </section>
    )
}
