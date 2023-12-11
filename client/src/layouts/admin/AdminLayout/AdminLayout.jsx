import PropTypes from 'prop-types';
import SidebarAdmin from '../Components/Sidebar';
import HeaderAdmin from '../Components/Header';

function AdminLayout({ children }) {
    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <SidebarAdmin />
            <div className="flex flex-col flex-1">
                <HeaderAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto bg_admin">
                    {children}
                </div>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
