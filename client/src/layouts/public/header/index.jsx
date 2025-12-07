import styles from './Header.module.scss';
import { Row, Col } from 'antd';
import Logo from '~/assets/logo/Logo_grey.svg';
import { FaSearch, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import Button from '~/components/button';
import config from '~/config';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '~/assets/avatar/avatarUser.jpg';
import { getCurrent } from '~/redux/features/slices/asyncActions';
import { logout, setToastVisibility } from '~/redux/features/slices/userSlice';
import { toast } from 'react-toastify';
import ChatBot from '../chatBot';
import { HiClipboardDocumentList } from "react-icons/hi2";
import { Heart, Baby, Sparkles, User, Coffee } from "lucide-react"

export default function Header({ handleInputChange, query }) {

    const dispatch = useDispatch();

    const { isLoggedIn, current, isToastVisible } = useSelector((state) => state.user);
    const categories_emoji = [
        {
            icon: Heart,
            color: "from-rose-400 to-pink-500",
            bgColor: "bg-rose-50",
            emoji: "👗",
        },
        {
            icon: Baby,
            color: "from-cyan-400 to-blue-500",
            bgColor: "bg-cyan-50",
            emoji: "🧸",
        },
        {
            icon: Sparkles,
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-50",
            emoji: "💄",
        },
        {
            icon: User,
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            emoji: "👔",
        },
        {
            icon: Coffee,
            color: "from-amber-400 to-yellow-500",
            bgColor: "bg-amber-50",
            emoji: "🌿",
        },
    ]
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let timeoutId;
        if (isLoggedIn) {
            dispatch(getCurrent());

            if (isToastVisible) {
                toast.success('Logged in Successfully!');
                timeoutId = setTimeout(() => {
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

    const displayName = current?.name;
    const firstName = displayName ? displayName.split(' ')[0] : '';
    const hasCurrent = !!current;

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            const merged = response.dataCategories.map((category, index) => ({
                ...category,
                ...categories_emoji[index % categories_emoji.length],
            }));
            setCategories(merged);
        };
        fetchApiCategories();
    }, []);

    return (
        <>
            {isLoggedIn ? <ChatBot /> : ''}
            <Row className={styles.header}>
                <Col span={3} className={styles.logo}>
                    <Link to={config.home}>
                        <img src={Logo} alt="Logo" />
                    </Link>
                </Col>
                <Col span={1} className={styles.line}>
                    <div className={styles.lineHeader}></div>
                </Col>
                <Col span={17} className={styles.category}>
                    <ul className={styles.categoryList}>
                        {categories.map((item) => (
                            <Link 
                                key={item?._id} 
                                className={`
                                    relative overflow-hidden px-4 py-3 rounded-lg transition-all duration-300 
                                    bg-white/20 backdrop-blur-sm border border-white/30
                                    hover:bg-white/30 hover:scale-105 hover:shadow-lg font-medium`} 
                                to={config[item.title.toLowerCase()]}>
                                <span className="text-lg">{item.emoji}</span>
                                <li>{item?.title}</li>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} animate-pulse`}></div>
                            </Link>
                        ))}
                    </ul>
                </Col>
                <Col className={styles.cpnHeader3} span={3}>
                    {/* <div className={styles.headerSearch}>
                        <FaSearch className={styles.searchIcon} />
                        <input onChange={handleInputChange}
                            value={query} type="text" placeholder="Enter to Search ..." className={styles.searchInput} />
                    </div> */}

                    <Link to={config.cart} className={styles.cart}>
                        <FaShoppingCart className={styles.cartIcon} />
                        <div className={styles.bgNumCart}>
                            <label>{current?.cart?.length || 0}</label>
                        </div>
                    </Link>

                    {(!isLoggedIn || !hasCurrent) &&
                        <div className={styles.buttonActionWrapper}>
                            <Button classParent={styles.buttonLogin} link={config.login} content="Login" />
                            <Button classParent={styles.buttonRegister} link={config.register} content="Register" />
                        </div>
                    }
                    {isLoggedIn && hasCurrent &&
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
                                    to={config.history}
                                >
                                    My Order <HiClipboardDocumentList />
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
                    }
                </Col>
            </Row>
        </>
    );
}

