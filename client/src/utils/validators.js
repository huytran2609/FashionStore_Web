/**
 * Validation utilities
 * Centralized validation functions for email, phone, password, and username
 */

// Regex patterns
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const PHONE_REGEX = /^[0-9]{10}$/;
export const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9\s-_]{5,23}$/;

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
    if (!email) return false;
    return EMAIL_REGEX.test(email);
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is valid
 */
export const validatePhone = (phone) => {
    if (!phone) return false;
    return PHONE_REGEX.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets requirements
 */
export const validatePassword = (password) => {
    if (!password) return false;
    return PWD_REGEX.test(password);
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} - True if username is valid
 */
export const validateUsername = (username) => {
    if (!username) return false;
    return USER_REGEX.test(username);
};

/**
 * Get email validation object for react-hook-form
 * @returns {object} - Validation object for react-hook-form
 */
export const getEmailValidation = () => ({
    required: 'Email is required',
    pattern: {
        value: EMAIL_REGEX,
        message: 'Invalid email address',
    },
});

/**
 * Get phone validation object for react-hook-form
 * @returns {object} - Validation object for react-hook-form
 */
export const getPhoneValidation = () => ({
    required: 'Phone number is required',
    pattern: {
        value: PHONE_REGEX,
        message: 'Invalid phone number (must be 10 digits)',
    },
});

/**
 * Get password validation object for react-hook-form
 * @returns {object} - Validation object for react-hook-form
 */
export const getPasswordValidation = () => ({
    required: 'Password is required',
    pattern: {
        value: PWD_REGEX,
        message: 'Password must contain uppercase, lowercase, number, and special character',
    },
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
    },
});

/**
 * Get username validation object for react-hook-form
 * @returns {object} - Validation object for react-hook-form
 */
export const getUsernameValidation = () => ({
    required: 'Username is required',
    pattern: {
        value: USER_REGEX,
        message: 'Username must be 6-24 characters, start with a letter',
    },
});

