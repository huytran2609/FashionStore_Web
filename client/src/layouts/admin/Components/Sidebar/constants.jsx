import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'products',
        label: 'Products',
        path: '/manage-product',
        icon: <HiOutlineCube />,
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/manage-order',
        icon: <HiOutlineShoppingCart />,
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/manage-user',
        icon: <HiOutlineUsers />,
    },
    {
        key: 'coupons',
        label: 'Coupon',
        path: '/manage-coupon',
        icon: <HiOutlineDocumentText />,
    },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />,
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />,
    },
];
