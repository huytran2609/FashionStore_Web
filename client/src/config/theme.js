/**
 * Theme Configuration
 * Centralized color system for buttons and UI components
 * 
 * Primary colors are based on the main brand color (#E280AD, #be226b)
 */

export const theme = {
    // Primary Button Colors (Main brand color - Pink/Magenta)
    primary: {
        background: 'linear-gradient(135deg, #be226b 0%, #ee1f6b 100%)',
        backgroundHover: 'linear-gradient(135deg, #a01d5a 0%, #d11b5f 100%)',
        backgroundActive: 'linear-gradient(135deg, #8b1950 0%, #b81652 100%)',
        color: '#ffffff',
        shadow: 'rgba(190, 34, 107, 0.3)',
        shadowHover: 'rgba(190, 34, 107, 0.4)',
        // Solid color variants
        solid: '#be226b',
        solidHover: '#a01d5a',
        solidActive: '#8b1950',
    },

    // Secondary Button Colors (Purple/Pink gradient - Modern look)
    secondary: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        backgroundHover: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
        backgroundActive: 'linear-gradient(135deg, #6d28d9 0%, #be185d 100%)',
        color: '#ffffff',
        shadow: 'rgba(139, 92, 246, 0.3)',
        shadowHover: 'rgba(139, 92, 246, 0.4)',
        // Solid color variants
        solid: '#8b5cf6',
        solidHover: '#7c3aed',
        solidActive: '#6d28d9',
    },

    // Success Button Colors (Green)
    success: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        backgroundHover: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        backgroundActive: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
        color: '#ffffff',
        shadow: 'rgba(16, 185, 129, 0.3)',
        shadowHover: 'rgba(16, 185, 129, 0.4)',
        // Solid color variants
        solid: '#10b981',
        solidHover: '#059669',
        solidActive: '#047857',
    },

    // Danger Button Colors (Red)
    danger: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        backgroundHover: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        backgroundActive: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
        color: '#ffffff',
        shadow: 'rgba(239, 68, 68, 0.3)',
        shadowHover: 'rgba(239, 68, 68, 0.4)',
        // Solid color variants
        solid: '#ef4444',
        solidHover: '#dc2626',
        solidActive: '#b91c1c',
    },

    // Warning Button Colors (Orange/Amber)
    warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        backgroundHover: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        backgroundActive: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
        color: '#ffffff',
        shadow: 'rgba(245, 158, 11, 0.3)',
        shadowHover: 'rgba(245, 158, 11, 0.4)',
        // Solid color variants
        solid: '#f59e0b',
        solidHover: '#d97706',
        solidActive: '#b45309',
    },

    // Info Button Colors (Blue)
    info: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        backgroundHover: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        backgroundActive: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
        color: '#ffffff',
        shadow: 'rgba(59, 130, 246, 0.3)',
        shadowHover: 'rgba(59, 130, 246, 0.4)',
        // Solid color variants
        solid: '#3b82f6',
        solidHover: '#2563eb',
        solidActive: '#1d4ed8',
    },

    // Outline Button Colors (Transparent with border)
    outline: {
        background: 'transparent',
        backgroundHover: 'rgba(190, 34, 107, 0.1)',
        backgroundActive: 'rgba(190, 34, 107, 0.2)',
        color: '#be226b',
        colorHover: '#a01d5a',
        border: '#be226b',
        borderHover: '#a01d5a',
        shadow: 'none',
        shadowHover: 'rgba(190, 34, 107, 0.2)',
    },

    // Ghost Button Colors (Minimal style)
    ghost: {
        background: 'transparent',
        backgroundHover: 'rgba(0, 0, 0, 0.05)',
        backgroundActive: 'rgba(0, 0, 0, 0.1)',
        color: '#374151',
        colorHover: '#111827',
        shadow: 'none',
        shadowHover: 'none',
    },

    // Default Button Colors (Neutral gray)
    default: {
        background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        backgroundHover: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
        backgroundActive: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
        color: '#ffffff',
        shadow: 'rgba(107, 114, 128, 0.3)',
        shadowHover: 'rgba(107, 114, 128, 0.4)',
        // Solid color variants
        solid: '#6b7280',
        solidHover: '#4b5563',
        solidActive: '#374151',
    },

    // Product Card Button Colors (Beautiful Pastel Blue gradient - Perfect for product cards)
    card: {
        background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #7DD3FC 100%)',
        backgroundHover: 'linear-gradient(135deg, #3B82F6 0%, #0EA5E9 50%, #38BDF8 100%)',
        backgroundActive: 'linear-gradient(135deg, #2563EB 0%, #0284C7 50%, #0EA5E9 100%)',
        color: '#ffffff',
        shadow: 'rgba(96, 165, 250, 0.3)',
        shadowHover: 'rgba(96, 165, 250, 0.4)',
        // Solid color variants
        solid: '#60A5FA',
        solidHover: '#3B82F6',
        solidActive: '#2563EB',
    },
};

/**
 * Get button styles based on variant
 * @param {string} variant - Button variant (primary, secondary, success, danger, warning, info, outline, ghost, default, card)
 * @param {boolean} useGradient - Whether to use gradient or solid color (default: true)
 * @returns {object} Style object with CSS properties
 */
export const getButtonTheme = (variant = 'primary', useGradient = true) => {
    const themeVariant = theme[variant] || theme.primary;
    
    if (variant === 'outline') {
        return {
            background: themeVariant.background,
            color: themeVariant.color,
            border: `1px solid ${themeVariant.border}`,
            boxShadow: themeVariant.shadow,
        };
    }
    
    if (variant === 'ghost') {
        return {
            background: themeVariant.background,
            color: themeVariant.color,
            border: 'none',
            boxShadow: themeVariant.shadow,
        };
    }
    
    return {
        background: useGradient ? themeVariant.background : themeVariant.solid,
        color: themeVariant.color,
        border: 'none',
        boxShadow: `0 0.25rem 0.5rem ${themeVariant.shadow}`,
    };
};

/**
 * Get button hover styles
 * @param {string} variant - Button variant (primary, secondary, success, danger, warning, info, outline, ghost, default, card)
 * @param {boolean} useGradient - Whether to use gradient or solid color
 * @returns {object} Style object with CSS properties
 */
export const getButtonHoverTheme = (variant = 'primary', useGradient = true) => {
    const themeVariant = theme[variant] || theme.primary;
    
    if (variant === 'outline') {
        return {
            background: themeVariant.backgroundHover,
            color: themeVariant.colorHover,
            border: `1px solid ${themeVariant.borderHover}`,
            boxShadow: `0 0.375rem 0.75rem ${themeVariant.shadowHover}`,
        };
    }
    
    if (variant === 'ghost') {
        return {
            background: themeVariant.backgroundHover,
            color: themeVariant.colorHover,
        };
    }
    
    return {
        background: useGradient ? themeVariant.backgroundHover : themeVariant.solidHover,
        boxShadow: `0 0.5rem 1rem ${themeVariant.shadowHover}`,
    };
};

/**
 * Get button active styles
 * @param {string} variant - Button variant (primary, secondary, success, danger, warning, info, outline, ghost, default, card)
 * @param {boolean} useGradient - Whether to use gradient or solid color
 * @returns {object} Style object with CSS properties
 */
export const getButtonActiveTheme = (variant = 'primary', useGradient = true) => {
    const themeVariant = theme[variant] || theme.primary;
    
    if (variant === 'outline' || variant === 'ghost') {
        return {
            background: themeVariant.backgroundActive,
        };
    }
    
    return {
        background: useGradient ? themeVariant.backgroundActive : themeVariant.solidActive,
    };
};

export default theme;

