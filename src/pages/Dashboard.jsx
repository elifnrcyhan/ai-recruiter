import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import RecentApplicants from "../components/dashboard/RecentApplicants";
import { api } from "../services/api";

function Dashboard() {
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [activeJobs, setActiveJobs] = useState(null);
  const [aiMatchRate, setAiMatchRate] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const jobs = await api.get("/jobs");
setActiveJobs(
  Array.isArray(jobs)
    ? jobs.filter((job) => job.isActive === true).length
    : 0
);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }

      try {
        const applications = await api.get(
          "/applications/company/count"
        );

        setTotalApplicants(applications.count);
      } catch (error) {
        console.error(
          "Failed to load applicants:",
          error
        );
      }

      try {
        const matchRate = await api.get(
          "/applications/company/ai-match-rate"
        );

        setAiMatchRate(matchRate.rate);
      } catch (error) {
        console.error(
          "Failed to load AI match rate:",
          error
        );
      }
    };

    loadDashboard();
  }, []);

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
          value={totalApplicants ?? "-"}
          description="All applicants"
        />

        <StatCard
          title="Active Jobs"
          value={activeJobs ?? "-"}
          description="Currently active jobs"
        />

        <StatCard
          title="Interviews"
          value="-"
          description="Scheduled interviews"
        />

        <StatCard
          title="AI Match Rate"
          value={
            aiMatchRate !== null
              ? `${aiMatchRate}%`
              : "-"
          }
          description="Average compatibility"
        />
      </div>

      <RecentApplicants />
    </div>
  );
}

export default Dashboard;