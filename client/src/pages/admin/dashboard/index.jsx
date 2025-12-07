import BuyerProfilePieChart from "~/layouts/admin/components/buyerProfilePieChart";
import DashboardStatsGrid from "~/layouts/admin/components/dashboardStatsGrid";
import PopularProducts from "~/layouts/admin/components/popularProducts";
import RecentOrders from "~/layouts/admin/components/recentOrders";
import TransactionChart from "~/layouts/admin/components/transactionChart";
import { adminGetUserOrder } from '~/apis/order';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUser } from "~/apis/user";
function Dashboard() {
	const [adminOrder, setAdminOrder] = useState([]);
	useEffect(() => {
		const fetchAdminOrder = async () => {
			const response = await adminGetUserOrder();
			if (response.success) {
				setAdminOrder(response)
			}
		}
		fetchAdminOrder();
	}, [])
	console.log(adminOrder)

	const [allUser, setAllUser] = useState([]);
	useEffect(() => {
		const fetchAdminOrder = async () => {
			const response = await getAllUser();
			if (response.success) {
				setAllUser(response)
			}
		}
		fetchAdminOrder();
	}, [])

	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid totalUsers={allUser.counts} totalOrders={adminOrder.counts} />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders fullOrders={adminOrder.orders} />
				<PopularProducts />
			</div>
		</div>
	);
}

export default Dashboard;
