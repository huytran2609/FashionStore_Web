import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { apiGetOrders, apiUpdateStatusOrder } from '~/apis/admin/order';
import { Pagination } from '~/components/pagination';
import Select from '~/components/select';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/components/inputSearch';
import { formatCreatedAt } from '~/utils/helpers';
import {toast} from 'react-toastify';

function Order() {
    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const [query, setQuery] = useState({ q: '' });
    const debounced = useDebounce(query.q, 600);

    const [params] = useSearchParams();
    const [editOrder, setEditOrder] = useState(null);
    const [updated, setUpdated] = useState(false);

    const queries = useMemo(() => {
        const queryParams = Object.fromEntries([...params]);
        if (debounced) {
            queryParams.q = debounced;
        }
        return { ...queryParams, limit: 5, sort: '-createdAt' };
    }, [debounced, params]);

    // Stringify queries to avoid object reference issues
    const queriesString = useMemo(() => JSON.stringify(queries), [queries]);

    const { data: orders = {} } = useFetch(() => apiGetOrders(queries), {
        dependencies: [queriesString, updated],
    });

    const render = useCallback(() => {
        setUpdated(!updated);
    }, [updated]);

    const handleUpdateStatus = async (data) => {
        const response = await apiUpdateStatusOrder(editOrder._id, data);
        if (response.success) {
            setEditOrder(null);
            render();
            toast.success(response.mes);
        } else {
            toast.error(response.mes);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Order Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="max-w-screen-xl w-[93.75rem] mt-3 rounded-lg">
                <form onSubmit={handleSubmit(handleUpdateStatus)}>
                    <table className="w-full table-auto mb-6 text-left bg-white">
                        <thead className="text-[0.8125rem] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Products</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">TotalPrice</th>
                                <th className="px-4 py-2">CreatedAt</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.orders?.map((order, index) => (
                                <tr
                                    key={`${order._id} - ${index} - ${order.color}`}
                                    className="border-b-2 border-neutral-600"
                                >
                                    <td className="whitespace-nowrap  px-5 py-2 font-semibold">{index + 1}</td>
                                    {order?.products?.map((item, index) => (
                                        <td
                                            key={item._id}
                                            className="flex flex-col whitespace-nowrap px-4 py-2 max-w-[18.75rem] overflow-hidden overflow-ellipsis"
                                        >
                                            <span className="font-semibold">Product {index + 1}:</span>
                                            <span>Title: {item.product.title}</span>
                                            <span>Color: {item.color}</span>
                                            <span>Quantity: {item.quantity}</span>
                                        </td>
                                    ))}

                                    <td className="whitespace-nowrap px-4 py-2 max-w-[25rem] overflow-hidden overflow-ellipsis">
                                        {editOrder?._id === order._id ? (
                                            <Select
                                                register={register}
                                                errors={errors}
                                                options={[
                                                    { code: 'Cancelled', value: 'Cancelled' },
                                                    { code: 'Processing', value: 'Processing' },
                                                    { code: 'Succeed', value: 'Succeed' },
                                                ]}
                                                id={'status'}
                                                validate={{ required: 'Required' }}
                                            />
                                        ) : (
                                            <span>{order?.status}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[9.375rem] overflow-hidden overflow-ellipsis">
                                        <span>{order?.orderBy?.name}</span>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2 max-w-[15.625rem] overflow-hidden overflow-ellipsis">
                                        <span>{order?.orderBy?.address}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[25rem] overflow-hidden overflow-ellipsis">
                                        <span>$&nbsp;{order?.totalPrice}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[25rem] overflow-hidden overflow-ellipsis">
                                        {/* {moment(order?.createdAt).format('MM/DD/YYYY')} */}
                                        {formatCreatedAt(order?.createdAt)}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 w-[3.125rem] overflow-hidden overflow-ellipsis text-center">
                                        {editOrder?._id === order._id ? (
                                            <>
                                                <button
                                                    type="submit"
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-13 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Update
                                                </button>
                                                <span
                                                    onClick={() => setEditOrder(null)}
                                                    className="rounded-md border bg-blue-100 border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Back
                                                </span>
                                            </>
                                        ) : (
                                            <span
                                                onClick={() => setEditOrder(order)}
                                                className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                            >
                                                Edit
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            </div>
            <Pagination totalCount={orders.counts} pageSize={5} />
        </div>
    );
}

export default Order;
