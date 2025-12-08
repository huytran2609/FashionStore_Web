/**
 * Environment configuration
 * 
 * For production, create a .env file in the client root directory with:
 * VITE_EMAILJS_SERVICE_ID=your_service_id
 * VITE_EMAILJS_TEMPLATE_ID=your_template_id
 * VITE_EMAILJS_PUBLIC_KEY=your_public_key
 * VITE_DEFAULT_PHONE=your_default_phone
 * VITE_DEBOUNCE_DELAY=600
 * VITE_TOAST_DELAY=100
 * VITE_HOME_PRODUCTS_LIMIT=100
 * VITE_HOME_DISPLAY_LIMIT=10
 * VITE_ADMIN_PRODUCTS_LIMIT=8
 */

export const emailjsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0hirvyh',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ypt2vbd',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Zuy7iE_yJXzm4f2rZ',
};

export const defaultValues = {
    phone: import.meta.env.VITE_DEFAULT_PHONE || '0308217772',
};

export const appConfig = {
    debounceDelay: Number(import.meta.env.VITE_DEBOUNCE_DELAY) || 600,
    toastDelay: Number(import.meta.env.VITE_TOAST_DELAY) || 100,
    homeProductsLimit: Number(import.meta.env.VITE_HOME_PRODUCTS_LIMIT) || 100,
    homeDisplayLimit: Number(import.meta.env.VITE_HOME_DISPLAY_LIMIT) || 10,
    adminProductsLimit: Number(import.meta.env.VITE_ADMIN_PRODUCTS_LIMIT) || 8,
};

