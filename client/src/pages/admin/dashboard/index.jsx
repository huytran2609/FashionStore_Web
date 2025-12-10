import BuyerProfilePieChart from "~/layouts/admin/components/buyerProfilePieChart";
import DashboardStatsGrid from "~/layouts/admin/components/dashboardStatsGrid";
import PopularProducts from "~/layouts/admin/components/popularProducts";
import RecentOrders from "~/layouts/admin/components/recentOrders";
import TransactionChart from "~/layouts/admin/components/transactionChart";
import { adminGetUserOrder } from '~/apis/order';
import { getAllUser } from "~/apis/user";
import { useFetch } from '~/hooks';
import Loading from '~/components/loading';
import ErrorMessage from '~/components/errorMessage';

function Dashboard() {
	const { data: adminOrder = {}, loading: loadingOrders, error: errorOrders } = useFetch(adminGetUserOrder);
	const { data: allUser = {}, loading: loadingUsers, error: errorUsers } = useFetch(getAllUser);

	if (loadingOrders || loadingUsers) {
		return <Loading />;
	}

	if (errorOrders || errorUsers) {
		return (
			<ErrorMessage 
				message={errorOrders || errorUsers || 'Failed to load dashboard data'} 
			/>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid 
				totalUsers={allUser?.counts || 0} 
				totalOrders={adminOrder?.counts || 0} 
			/>
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders fullOrders={adminOrder?.orders || []} />
				<PopularProducts />
			</div>
		</div>
	);
}

export default Dashboard;
