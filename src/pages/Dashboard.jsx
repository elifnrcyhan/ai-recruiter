import StatCard from "../components/dashboard/StatCard";
import RecentApplicants from "../components/dashboard/RecentApplicants";
import LoadingState from "../components/common/LoadingState";

function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview of your recruitment activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applicants"
          value={null}
          description="All applicants"
        />

        <StatCard
          title="Active Jobs"
          value={null}
          description="Currently active jobs"
        />

        <StatCard
          title="Interviews"
          value={null}
          description="Scheduled interviews"
        />

        <StatCard
          title="AI Match Rate"
          value={null}
          description="Average compatibility"
        />
      </div>

      <RecentApplicants />
    </div>
  );
}

export default Dashboard;