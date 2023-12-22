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

const publicRoutes = [
    { path: config.home, page: Home },
    { path: config.login, page: Login, layout: null },
    { path: config.register, page: Register, layout: null },
    { path: config.category, page: Category },
    { path: config.productdetail, page: ProductDetail },
    // { path: config.cart, page: Cart },
    // { path: config.profile, page: Profile },
];

const privateRoutes = [
    { path: config.admin, page: Dashboard },
    { path: config.manage_product, page: Product },
    { path: config.manage_order, page: Order },
    { path: config.manage_user, page: User },
];

export { publicRoutes, privateRoutes };
