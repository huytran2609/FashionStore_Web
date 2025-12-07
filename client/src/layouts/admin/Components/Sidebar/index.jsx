import Logo from '~/assets/logo/Logo_grey.svg';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from './constants';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import config from '~/config';

const linkClass =
    'flex item-center gap-2 px-3 py-2 hover:item_color hover:no-underline active:bg-blue-600 active:text-white rounded-md text-base';

function SidebarAdmin() {
    const { pathname } = useLocation();
    return (
        <div className="bg-gray-900 w-60 p-3 flex flex-col">
            <Link to={config.home}>
                <img alt="4BEST" src={Logo} />
            </Link>
            <div className="flex flex-1 flex-col gap-2 py-8">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <Link
                        to={link.path}
                        key={link.key}
                        className={classNames(
                            pathname === link.path ? 'item_color text-white' : 'text-gray-400',
                            linkClass,
                        )}
                    >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-1 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <Link
                        to={link.path}
                        key={link.key}
                        className={classNames(
                            pathname === link.path ? 'item_color text-white' : 'text-gray-400',
                            linkClass,
                        )}
                    >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                <span className="text-xl">
                    <HiOutlineLogout />
                </span>
                Logout
            </div>
        </div>
    );
}

export default SidebarAdmin;
