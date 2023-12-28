import styles from './Header.module.scss';
import { Row, Col } from 'antd';
import Logo from '~/assets/Logo/Logo_grey.svg';
import { FaSearch, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import Button from '~/components/Button/Button';
import config from '~/config';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '~/assets/Avatar/avatarUser.jpg';
import { getCurrent } from '~/redux/features/slices/asyncActions';
import { logout, setToastVisibility } from '~/redux/features/slices/userSlice';
import { toast } from 'react-toastify';

export default function Header() {

    const dispatch = useDispatch();

    const { isLoggedIn, current, isToastVisible } = useSelector((state) => state.user);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let timeoutId;
        if (isLoggedIn) {
            dispatch(getCurrent());

            if (isToastVisible) {
                toast.success('Logged in Successfully!');
                timeoutId = setTimeout(() => {
                    // If using Redux, dispatch an action to update isToastVisible in the global state
                    dispatch(setToastVisibility());
                }, 100);
            }
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [dispatch, isLoggedIn, isToastVisible]);

    // const [loading, setLoading] = useState(true);
    // const [userName, setUserName] = useState('');

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         dispatch(getCurrent())
    //             .then(() => setLoading(false))
    //             .catch((error) => {
    //                 console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    //                 setLoading(false);
    //             });
    //     }
    // }, [dispatch, isLoggedIn]);

    // useEffect(() => {
    //     // Kiểm tra xem current tồn tại và có thuộc tính name không
    //     if (current && current.name) {
    //         setUserName(current.name.split(' ')[0]);
    //     }
    // }, [current]);

    const displayName = current?.name;
    const firstName = displayName ? displayName.split(' ')[0] : '';

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
        };
        fetchApiCategories();
    }, []);

    return (
        <>
            <Row className={styles.header}>
                <Col span={3} className={styles.logo}>
                    <Link to={config.home}>
                        <img src={Logo} alt="Logo" />
                    </Link>
                </Col>
                <div className={styles.lineHeader}></div>
                <Col span={11} className={styles.category}>
                    <ul className={styles.categoryList}>
                        {categories.map((data) => (
                            <Link key={data._id} to={config[data.title.toLowerCase()]}>
                                <li>{data.title}</li>
                            </Link>
                        ))}
                    </ul>
                </Col>
                <Col className={styles.cpnHeader3} span={10}>
                    <div className={styles.headerSearch}>
                        <FaSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Enter to Search ..." className={styles.searchInput} />
                    </div>

                    <Link to={config.cart} className={styles.cart}>
                        <FaShoppingCart className={styles.cartIcon} />
                        <label>{current?.cart?.length || 0}</label>
                    </Link>
                    {/* {loading ? (
                        <div>Wait a minutes...</div>
                    ) : (
                        <> */}
                    {!isLoggedIn ? (
                        <>
                            <Button link={config.login} content="Login" />

                            <Button link={config.register} content="Register" />
                        </>
                    ) : (
                        <div className={styles.userInfo}>
                            <h3>Hi,&nbsp;{firstName}</h3>
                            <Link to={config.profile} className={styles.imgAvatar}>
                                <img src={avatar} alt="UserImg" />
                            </Link>
                            <div className={styles.dropdownContent}>
                                <Link
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        color: 'black',
                                        fontSize: '15px',
                                    }}
                                    to={config.profile}
                                >
                                    Profile <ImProfile />
                                </Link>
                                <Link
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        color: 'black',
                                        fontSize: '15px',
                                    }}
                                    to={config.category}
                                >
                                    Category <BiSolidCategoryAlt />
                                </Link>
                                <Link
                                    onClick={() => dispatch(logout())}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        color: 'red',
                                        fontSize: '15px',
                                    }}
                                >
                                    Logout <FaSignOutAlt />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* </>)} */}
                </Col>
            </Row>
        </>
    );
}
