import config from '~/config';
import Dashboard from '~/pages/admin/dashboard';
import Order from '~/pages/admin/orders';
import Product from '~/pages/admin/products';
import User from '~/pages/admin/users';
import Home from '~/pages/public/home';
import Login from '~/pages/public/login';
import Register from '~/pages/public/register';
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
const publicRoutes = [
    { path: config.home, page: Home },
    { path: config.login, page: Login, layout: null },
    { path: config.register, page: Register, layout: null },
    { path: config.category, page: Category, layout: null },
    { path: config.productdetail, page: ProductDetail },
    { path: config.women, page: Women },
    { path: config.men, page: Men },
    { path: config.beauty, page: Beauty },
    { path: config.kids, page: Kids },
    { path: config.lifestyle, page: Lifestyle },
    { path: config.cart, page: Cart },
    { path: config.profile, page: Profile },
    { path: config.history, page: HistoryOrder },
];

const privateRoutes = [
    { path: config.admin, page: Dashboard },
    { path: config.manage_product, page: Product },
    { path: config.manage_order, page: Order },
    { path: config.manage_user, page: User },
];

export { publicRoutes, privateRoutes };
