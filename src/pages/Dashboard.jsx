import StatCard from "../components/dashboard/StatCard";
import RecentApplicants from "../components/dashboard/RecentApplicants";
import AIInsights from "../components/dashboard/AIInsights";
import ApplicationChart from "../components/dashboard/ApplicationChart";
function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
  <h1 className="text-3xl font-bold tracking-tight">
    Dashboard
  </h1>

  <p className="text-muted-foreground">
    Welcome back! Here's an overview of your recruitment pipeline.
  </p>
</div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applicants"
          value="128"
        />

        <StatCard
          title="Active Jobs"
          value="24"
        />

        <StatCard
          title="Interviews"
          value="12"
        />

        <StatCard
          title="AI Match Rate"
          value="%86"
        />
      </div>

      <RecentApplicants />
      <AIInsights />
      <ApplicationChart />

    </div>
  );
}

export default Dashboard;