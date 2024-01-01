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
import Women from '~/pages/public/category/women';
import Men from '~/pages/public/category/men';
import Beauty from '~/pages/public/category/beauty';
import Kids from '~/pages/public/category/kids';
import Lifestyle from '~/pages/public/category/lifestyle';
import Cart from '~/pages/public/Cart/Cart';
import Profile from '~/pages/public/profile/Profile';
import HistoryOrder from '~/pages/public/historyOrder/HistoryOrder';
import Contact from '~/pages/public/Contact/Contact';
import HistoryOrderDetail from '~/pages/public/HistoryOrderDetail/HistoryOrderDetail';
const publicRoutes = [
    { path: config.home, page: Home },
    { path: config.login, page: Login, layout: null },
    { path: config.register, page: Register, layout: null },
    { path: config.verifyemail, page: VerifyEmail, layout: null },
    { path: config.resetpassword, page: ForgotPassword, layout: null },
    { path: config.category, page: Category, layout: null },
    { path: config.productdetail, page: ProductDetail },
    { path: config.women, page: Women, layout: null },
    { path: config.men, page: Men, layout: null },
    { path: config.beauty, page: Beauty, layout: null },
    { path: config.kids, page: Kids, layout: null },
    { path: config.lifestyle, page: Lifestyle, layout: null },
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
