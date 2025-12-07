import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function RecentOrders({ fullOrders }) {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div style={{ height: '31.25rem', overflow: 'auto', border: '0.0625rem solid #666' }} className=" rounded-sm mt-3">
                <table className="w-full text-gray-700 border-separate border border-spacing-4">
                    <thead className='bg-gray-100 border-collapse'>
                        <tr>
                            <th>ID</th>
                            {/* <th>Product ID</th> */}
                            <th>Customer Name</th>
                            <th>Order Date</th>
                            <th>Order Total</th>
                            <th>Shipping Address</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {fullOrders?.map((order) => (
                            <tr key={order._id} className=' text-left'>
                                <td>
                                    <Link to={`/order/${order._id}`}>#{order._id}</Link>
                                </td>
                                {/* <td>
                                    <Link to={`/product/${order.product_id}`}>#{order.product_id}</Link>
                                </td> */}
                                <td>
                                    <Link to={`/customer/${order.orderBy.userId}`}>{order.orderBy.name}</Link>
                                </td>
                                <td>{format(new Date(order.createdAt), 'dd MMM yyyy')}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderBy.address}</td>
                                <td>{getOrderStatus(order.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

function getOrderStatus(status) {
    switch (status) {
        case 'PLACED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
        case 'CONFIRMED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
        case 'SHIPPED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
        case 'OUT_FOR_DELIVERY':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
        case 'DELIVERED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
        default:
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
                    {status.replaceAll('_', ' ').toLowerCase()}
                </span>
            );
    }
}

export default RecentOrders;
