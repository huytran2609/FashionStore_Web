import PropTypes from 'prop-types';

/**
 * Reusable ErrorMessage component
 * @param {string} message - Error message to display
 * @param {string} className - Additional CSS classes
 * @param {function} onRetry - Optional retry callback
 */
export default function ErrorMessage({ 
    message = 'An error occurred', 
    className = '',
    onRetry 
}) {
    return (
        <div 
            className={`flex flex-col items-center justify-center gap-4 p-8 ${className}`}
            style={{ minHeight: '200px' }}
        >
            <div className="text-red-600 text-center">
                <svg 
                    className="w-12 h-12 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
                <p className="text-lg font-semibold">{message}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
    onRetry: PropTypes.func,
};

