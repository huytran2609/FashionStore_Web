import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from '~/apis/admin/user';
import { Pagination } from '~/components/Pagination';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/Components/InputSearch';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InputForm from '~/components/InputForm';

function User() {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ email: '', name: '', phone: '', status: '' });

    const [editUser, setEditUser] = useState(null);
    const [updated, setUpdated] = useState(false);

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({ q: '' });

    const [params] = useSearchParams();

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
    }, [debounced, params, updated]);

    useEffect(() => {
        // Khi editUser thay đổi, cập nhật giá trị mặc định của các trường
        if (editUser) {
            setValue('name', editUser.name);
            setValue('email', editUser.email);
            setValue('phone', editUser.phone);
            setValue('status', editUser.isBlocked ? 'Block' : 'Active');
        }
        console.log(editUser);
    }, [editUser, setValue]);

    const render = useCallback(() => {
        setUpdated(!updated);
    }, [updated]);

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editUser._id);
        if (response.success) {
            setEditUser(null);
            render()
            toast.success(response.mes);
        } else {
            toast.error(response.mes);
        }
    };

    const handleDelete = async (uid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    render()
                    toast.success(response.mes);
                } else {
                    toast.error(response.mes);
                }
            }
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Customer Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
            </div>
            <div className="w-full mt-3 rounded-md overflow-hidden">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <table className="w-full table-auto mb-6 text-left bg-white">
                        <thead className="text-[13px] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Created At</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((user, index) => (
                                <tr key={user._id} className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap  px-4 py-2 font-semibold">{index + 1}</td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editUser?._id === user._id ? (
                                            <InputForm
                                                key={editUser?._id}
                                                register={register}
                                                errors={errors}
                                                defaultValue={editUser?.name}
                                                id={'name'}
                                                validate={{ required: 'Required' }}
                                            />
                                        ) : (
                                            <span>{user?.name}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editUser?._id === user._id ? (
                                            <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={watch(editUser?.email)}
                                                id={'email'}
                                                validate={{
                                                    required: 'Required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{user?.email}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editUser?._id === user._id ? (
                                            <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={editUser?.phone}
                                                id={'phone'}
                                                validate={{
                                                    required: 'Required',
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: 'Invalid phone number',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{user?.phone}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editUser?._id === user._id ? (
                                            <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={editUser?.isBlocked ? 'Block' : 'Active'}
                                                id={'status'}
                                                validate={{ required: 'Required' }}
                                            />
                                        ) : (
                                            <span>{user?.isBlocked ? 'Block' : 'Active'}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {moment(user?.createdAt).format('MM/DD/YYYY')}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editUser?._id === user._id ? (
                                            <>
                                                <button
                                                    type="submit"
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-13 p-1 mr-1 hover:bg-blue-500 hover:text-white"
                                                >
                                                    Update
                                                </button>
                                                <span
                                                    onClick={() => setEditUser(null)}
                                                    className="rounded-md border bg-blue-100 border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Back
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    onClick={() => setEditUser(user)}
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-red-600 rounded-md border border-red-600 text-white text-[12px] w-12 p-1 hover:bg-red-700 hover:text-white cursor-pointer"
                                                >
                                                    Delete
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <Pagination totalCount={users.counts} />
        </div>
    );
}

export default User;
