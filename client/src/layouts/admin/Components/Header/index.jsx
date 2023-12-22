import { HiOutlineBell, HiOutlineChatAlt } from 'react-icons/hi';
import { Menu, Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';

function HeaderAdmin() {
    return (
        <div className="bg-white h-16 px-4 flex items-center justify-end border-b border-gray-200">
            <div className="mr-6 flex items-center">
                <HiOutlineBell fontSize={24} className='mr-6'/>
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:ring-2 focus:ring-neutral-300 focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <div
                                style={{
                                    backgroundImage:
                                        'url("https://th.bing.com/th/id/OIP.4j7CC_PvAEE-P1obTZP6hgHaG-?w=198&h=186&c=7&r=0&o=5&pid=1.7")',
                                }}
                                className="h-10 w-10 rounded-full bg-sky-500 bg-cover object-cover bg-no-repeat"
                            >
                                <span className="sr-only">Percy</span>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'active:bg-gray-200 rounded-md px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                        )}
                                    >
                                        Your profile
                                    </div>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'active:bg-gray-200 rounded-md px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                        )}
                                    >
                                        Settings
                                    </div>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'active:bg-gray-200 rounded-md px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                        )}
                                    >
                                        Logout
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}

export default HeaderAdmin;
