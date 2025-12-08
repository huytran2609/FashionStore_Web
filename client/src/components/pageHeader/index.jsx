import PropTypes from 'prop-types';

/**
 * Reusable PageHeader component for admin pages
 * @param {string} title - Page title
 * @param {ReactNode} children - Additional content (e.g., search bar)
 * @param {string} className - Additional CSS classes
 */
export default function PageHeader({ title, children, className = '' }) {
    return (
        <div className={`flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md ${className}`}>
            <h3 className="font-semibold text-xl">{title}</h3>
            {children}
        </div>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
};

