import PropTypes from 'prop-types';

function AdminLayout({ children }) {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
