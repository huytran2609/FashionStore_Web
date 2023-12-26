import moment from 'moment';
import { useEffect, useState } from 'react';
import { apiGetUsers } from '~/apis/admin/user';
import { Pagination } from '~/components/Pagination';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/Components/InputSearch';
import { useSearchParams } from 'react-router-dom';
import Modal from '~/components/Modal';

function Product() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({ q: '' });

    const [params] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    const debounced = useDebounce(query.q, 600);

    const fetchApiUsers = async (params) => {
        const response = await apiGetUsers({ ...params });
        setUsers(response);
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (debounced) {
            queries.q = debounced;
        }
        fetchApiUsers(queries);
    }, [debounced, params]);

    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Product Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className="bg-blue-600 rounded-md border border-blue-600 text-white text-[14px] w-25 p-2 hover:bg-blue-700 hover:text-white"
                >
                    Add new product
                </button>
            </div>
            <div className="w-full mt-3 rounded-md overflow-hidden">
                <table className="w-full table-auto mb-6 text-left bg-white">
                    <thead className="text-[13px] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Updated At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users?.map((user, index) => (
                            <tr key={user._id} className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap  px-4 py-2 font-semibold">{index + 1}</td>
                                <td className="whitespace-nowrap  px-4 py-2">{user.name}</td>
                                <td className="whitespace-nowrap  px-4 py-2">{user.email}</td>
                                <td className="whitespace-nowrap  px-4 py-2">{user.phone}</td>
                                <td className="whitespace-nowrap  px-4 py-2">{user.isBlocked ? 'Block' : 'Active'}</td>
                                <td className="whitespace-nowrap  px-4 py-2">
                                    {moment(user.createdAt).format('MM/DD/YYYY')}
                                </td>
                                <td className="whitespace-nowrap  px-4 py-2">
                                    {moment(user.updatedAt).format('MM/DD/YYYY')}
                                </td>
                                <td className="whitespace-nowrap  px-4 py-2">
                                    <button className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white">
                                        Edit
                                    </button>
                                    <button className="bg-red-600 rounded-md border border-red-600 text-white text-[12px] w-12 p-1 hover:bg-red-700 hover:text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination totalCount={users.counts} />
            {/* Add product */}
            <Modal isOpen={isOpen} handleClose={() => {setIsOpen(false)}} title="Tạo mới sản phẩm" size="md">
                Modal
            </Modal>
        </div>
    );
}

export default Product;
