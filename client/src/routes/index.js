import config from '~/config';
import Dashboard from '~/pages/admin/dashboard';
import Order from '~/pages/admin/orders';
import Product from '~/pages/admin/products';
import User from '~/pages/admin/users';
import Coupon from '~/pages/admin/coupon';
import Home from '~/pages/public/home';
import Login from '~/pages/public/login';
import Register from '~/pages/public/register';
import VerifyEmail from '~/pages/public/verifyEmail';
import ForgotPassword from '~/pages/public/forgotPassword';
import Category from '~/pages/public/category';
import ProductDetail from '~/pages/public/productdetail';
import Cart from '~/pages/public/cart';
import Profile from '~/pages/public/profile';
import HistoryOrder from '~/pages/public/historyOrder';
import Contact from '~/pages/public/contact';
import HistoryOrderDetail from '~/pages/public/historyOrderDetail';
const publicRoutes = [
    { path: config.home, page: Home },
    { path: config.login, page: Login, layout: null },
    { path: config.register, page: Register, layout: null },
    { path: config.verifyemail, page: VerifyEmail, layout: null },
    { path: config.resetpassword, page: ForgotPassword, layout: null },
    { path: config.category, page: Category },
    { path: config.productdetail, page: ProductDetail },
    { path: config.women, page: Category },
    { path: config.men, page: Category },
    { path: config.beauty, page: Category },
    { path: config.kids, page: Category },
    { path: config.lifestyle, page: Category },
    { path: config.cart, page: Cart },
    { path: config.profile, page: Profile },
    { path: config.history, page: HistoryOrder },
    { path: config.historydetail, page: HistoryOrderDetail },
    { path: config.contact, page: Contact },
];

const privateRoutes = [
    { path: config.admin, page: Dashboard },
    { path: config.manage_product, page: Product },
    { path: config.manage_order, page: Order },
    { path: config.manage_user, page: User },
    { path: config.manage_coupon, page: Coupon },
];

export { publicRoutes, privateRoutes };
