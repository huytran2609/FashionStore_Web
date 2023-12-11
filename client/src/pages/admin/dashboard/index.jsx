import BuyerProfilePieChart from "~/layouts/admin/Components/BuyerProfilePieChart";
import DashboardStatsGrid from "~/layouts/admin/Components/DashboardStatsGrid";
import PopularProducts from "~/layouts/admin/Components/PopularProducts";
import RecentOrders from "~/layouts/admin/Components/RecentOrders";
import TransactionChart from "~/layouts/admin/Components/TransactionChart";

function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
    );
}

export default Dashboard;
