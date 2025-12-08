import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

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
    type = 'link' // 'link', 'button', or 'submit'
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

    const handleNoneClick = () => {};

    const buttonContent = (
        <>
            {cart && <FaShoppingCart className={styles.cartIcon} />}
            {content}
        </>
    );

    // If link is provided, render as navigation button
    if (link && !disabled) {
        return (
            <div className={`${styles.btn} ${classParent || ''}`}>
                <Link className={`${styles.btnLink} ${classChild || ''}`} to={link}>
                    {buttonContent}
                </Link>
            </div>
        );
    }

    // Otherwise, render as action button (with or without onClick)
    return (
        <div 
            onClick={disabled ? handleNoneClick : (onClick ? handleClick : undefined)} 
            className={`${disabled ? styles.classDisable : ''} ${styles.btn} ${classParent || ''}`}
        >
            {disabled ? (
                <div className={`${styles.btnLink} ${classChild || ''} ${styles.disabled}`}>
                    {buttonContent}
                </div>
            ) : (
                <button 
                    type={type === 'submit' ? 'submit' : 'button'}
                    className={`${styles.btnLink} ${classChild || ''}`}
                    value={value}
                    onClick={onClick ? handleClick : undefined}
                >
                    {buttonContent}
                </button>
            )}
        </div>
    );
}
