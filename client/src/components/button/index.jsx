import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { getButtonTheme, getButtonHoverTheme, getButtonActiveTheme } from '~/config/theme';

/**
 * Unified Button component that handles both navigation and action buttons
 * @param {function} onClick - Click handler for action buttons (when link is not provided)
 * @param {string} link - Route path for navigation buttons
 * @param {string|ReactNode} content - Button text or content
 * @param {string} classParent - Additional CSS classes for parent container
 * @param {string} classChild - Additional CSS classes for button element
 * @param {boolean} cart - Show cart icon
 * @param {boolean} disabled - Disable button
 * @param {string} value - Value for form buttons (used with onClick)
 * @param {string} type - Button type: 'link' (navigation), 'button' (action), or 'submit'
 * @param {string} variant - Button variant: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost', 'default', 'card'
 * @param {boolean} useGradient - Whether to use gradient or solid color (default: true)
 */
export default function Button({ 
    onClick, 
    link, 
    content, 
    classParent, 
    classChild, 
    cart, 
    disabled,
    value,
    type = 'link', // 'link', 'button', or 'submit'
    variant = 'primary', // 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost', 'default', 'card'
    useGradient = true
}) {
    const handleClick = (event) => {
        if (disabled || !onClick) return;
        
        // For buttons with value, create synthetic event
        if (value !== undefined) {
            const syntheticEvent = {
                ...event,
                target: {
                    ...event.target,
                    value: value || event.target.value,
                },
                currentTarget: {
                    ...event.currentTarget,
                    value: value || event.currentTarget.value,
                },
            };
            onClick(syntheticEvent);
        } else {
            onClick(event);
        }
    };


    // Get theme styles based on variant
    const themeStyles = getButtonTheme(variant, useGradient);
    const hoverStyles = getButtonHoverTheme(variant, useGradient);
    const activeStyles = getButtonActiveTheme(variant, useGradient);

    // Create inline styles for dynamic theming
    const buttonStyle = {
        background: themeStyles.background,
        color: themeStyles.color,
        border: themeStyles.border || 'none',
        boxShadow: themeStyles.boxShadow,
    };

    const buttonHoverStyle = {
        background: hoverStyles.background,
        color: hoverStyles.color || themeStyles.color,
        border: hoverStyles.border || themeStyles.border || 'none',
        boxShadow: hoverStyles.boxShadow || themeStyles.boxShadow,
    };

    const buttonActiveStyle = {
        background: activeStyles.background,
    };

    const buttonContent = (
        <>
            {cart && (
                <>
                    {/* Original cart icon and text - visible by default */}
                    <span className={styles.buttonText}>
                        <FaShoppingCart className={styles.cartIcon} />
                        {content}
                    </span>
                    {/* Animated cart icon - appears on hover */}
                    <FaShoppingCart className={styles.cartIconAnimated} />
                </>
            )}
            {!cart && content}
        </>
    );
    
    // Determine if button has cart animation
    const hasCartAnimation = cart === true;

    // If link is provided, render as navigation button (without wrapper div to avoid double layers)
    if (link && !disabled) {
        return (
            <Link 
                className={`${styles.btnLink} ${hasCartAnimation ? styles.btnLinkWithCart : ''} ${classChild || ''} ${styles[variant] || ''} ${classParent || ''}`}
                to={link}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, buttonHoverStyle);
                }}
                onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, buttonStyle);
                }}
                onMouseDown={(e) => {
                    Object.assign(e.currentTarget.style, buttonActiveStyle);
                }}
                onMouseUp={(e) => {
                    Object.assign(e.currentTarget.style, buttonHoverStyle);
                }}
            >
                {buttonContent}
            </Link>
        );
    }

    // Otherwise, render as action button (with or without onClick)
    // Fix: Remove nested div wrapper to prevent double buttons
    if (disabled) {
        return (
            <div className={`${styles.classDisable} ${styles.btn} ${classParent || ''}`}>
                <div className={`${styles.btnLink} ${classChild || ''} ${styles.disabled}`}>
                    {buttonContent}
                </div>
            </div>
        );
    }

    // Render button directly without wrapper div to prevent nesting
    return (
        <button 
            type={type === 'submit' ? 'submit' : 'button'}
            className={`${styles.btnLink} ${hasCartAnimation ? styles.btnLinkWithCart : ''} ${classChild || ''} ${styles[variant] || ''} ${classParent || ''}`}
            style={buttonStyle}
            value={value}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, buttonHoverStyle);
            }}
            onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, buttonStyle);
            }}
            onMouseDown={(e) => {
                Object.assign(e.currentTarget.style, buttonActiveStyle);
            }}
            onMouseUp={(e) => {
                Object.assign(e.currentTarget.style, buttonHoverStyle);
            }}
        >
            {buttonContent}
        </button>
    );
}
