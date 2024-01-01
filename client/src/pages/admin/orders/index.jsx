import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiGetOrders } from '~/apis/admin/order';
import { Pagination } from '~/components/Pagination';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/Components/InputSearch';
import { formatCreatedAt } from '~/utils/helpers';

function Order() {
    const [orders, setOrders] = useState([]);

    const [query, setQuery] = useState({ q: '' });
    const debounced = useDebounce(query.q, 600);

    const [params] = useSearchParams();
    const [editOrder, setEditOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async (params) => {
            const response = await apiGetOrders({...params, limit: 5, sort: '-createdAt'});
            if (response.success) {
                setOrders(response);
            }
        };
        const queries = Object.fromEntries([...params]);
        if(debounced) {
            queries.q = debounced;
        }
        fetchOrders(queries);
    }, [debounced, params]);


    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Order Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
            </div>
            <div className="max-w-screen-xl mt-3 rounded-lg">
                <form>
                    <table className="w-full table-auto mb-6 text-left bg-white">
                        <thead className="text-[13px] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
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
                                        <td key={item._id} className="flex flex-col whitespace-nowrap px-4 py-2 max-w-[300px] overflow-hidden overflow-ellipsis">
                                            <span className='font-semibold'>Product {index+1}:</span>
                                            <span>Title: {item.product.title}</span>                                      
                                            <span>Color: {item.color}</span>                                      
                                            <span>Quantity: {item.quantity}</span>                                                                                  
                                        </td>
                                    ))}
                                    

                                    <td className="whitespace-nowrap px-4 py-2 max-w-[400px] overflow-hidden overflow-ellipsis">
                                        <span>{order?.status}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[400px] overflow-hidden overflow-ellipsis">
                                        <span>{order?.orderBy?.name}</span>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2 max-w-[250px] overflow-hidden overflow-ellipsis">
                                        <span>{order?.orderBy?.address}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[400px] overflow-hidden overflow-ellipsis">
                                        <span>$&nbsp;{order?.totalPrice}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[400px] overflow-hidden overflow-ellipsis">
                                        {/* {moment(order?.createdAt).format('MM/DD/YYYY')} */}
                                        {formatCreatedAt(order?.createdAt)}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 w-[50px] overflow-hidden overflow-ellipsis text-center">
                                        <span className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer">
                                            Edit
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <Pagination totalCount={orders.counts} pageSize={5} />
        </div>
    );
}

export default Order;
