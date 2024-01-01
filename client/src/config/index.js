const config = {
    //public
    home: '/',
    login: '/login',
    register: '/register',
    verifyemail: '/verifyEmail/:status',
    resetpassword: '/reset-password/:token',
    category: '/category',
    women: '/women',
    men: '/men',
    kids: '/kids',
    lifestyle: '/lifestyle',
    beauty: '/beauty',
    productdetail: '/productdetail/:id/:title',
    cart: '/cart',
    profile: '/profile',
    history: '/history',
    historydetail: '/historydetail/:oid',
    contact: '/contact',
    //private
    admin: '/dashboard',
    manage_order: '/manage-order',
    manage_product: '/manage-product',
    manage_user: '/manage-user',
    manage_coupon: '/manage-coupon',
};

export default config;
