import PropTypes from 'prop-types';

/**
 * Reusable EmptyState component for displaying empty states
 * @param {string} image - Image source for empty state
 * @param {string} title - Title text (optional)
 * @param {string} message - Message text (optional)
 * @param {string} className - Additional CSS classes
 * @param {object} imageStyle - Inline styles for image
 */
export default function EmptyState({ 
    image, 
    title, 
    message, 
    className = '', 
    imageStyle = {} 
}) {
    return (
        <div 
            className={className}
            style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            {image && (
                <img 
                    src={image} 
                    alt={title || 'Empty state'} 
                    style={{ height: '55%', ...imageStyle }}
                />
            )}
            {title && <h3>{title}</h3>}
            {message && <p>{message}</p>}
        </div>
    );
}

EmptyState.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string,
    imageStyle: PropTypes.object,
};

