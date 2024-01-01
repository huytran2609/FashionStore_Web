import styles from './LeftProfile.module.scss';
import avatar from '~/assets/Avatar/avatarUser.jpg';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FaHistory, FaUserCircle, FaTrash } from 'react-icons/fa';
import { apiDeleteUser } from '~/apis/admin/user';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/features/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function LeftProfile() {
    const { current } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const [file] = imgInp.files;
        if (file) {
            imgAva.src = URL.createObjectURL(file);
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(current._id);
                if (response.success) {
                    dispatch(logout())
                    navigate('/')
                    toast.success("Delete user successfully!")
                    window.reload()
                } else {
                    toast.error(response.mes);
                }
            }
        });
    };
    return (
        <>
            <div className={styles.avataUser}>
                <div className={styles.imgAva}>
                    <img id="imgAva" src={avatar} alt="IMG AVATAR" />
                </div>
                <form runat="server">
                    <input onChange={handleChange} accept="image/*" type="file" id="imgInp" />
                </form>
            </div>
            <Link to={config.profile} className={styles.userInfo}>
                <FaUserCircle className={styles.icon} />
                <h1>User Profile</h1>
            </Link>
            <Link to={config.history} className={styles.userInfo}>
                <FaHistory className={`${styles.history} ${styles.icon}`} />
                <h1>Order History</h1>
            </Link>

            <Link style={{ color: 'red' }} className={styles.userInfo} onClick={() => handleDelete()}>
                <FaTrash className={`${styles.history} ${styles.icon}`} />
                <h1>Delete Account</h1>
            </Link>
        </>
    );
}
