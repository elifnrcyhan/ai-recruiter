import { useMemo, useState } from "react";

import JobToolbar from "../components/jobs/JobToolbar";
import JobList from "../components/jobs/JobList";
import JobFilters from "../components/jobs/JobFilters";

function Jobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      applicants: 12,
      matchRate: 86,
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Hybrid",
      type: "Full Time",
      applicants: 8,
      matchRate: 79,
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      applicants: 5,
      matchRate: 72,
      status: "Closed",
    },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        job.status.toLowerCase() === status;

      const matchesType =
        employmentType === "all" ||
        job.type.toLowerCase().replace(" ", "-") === employmentType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, status, employmentType]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Jobs
        </h1>

        <p className="text-muted-foreground">
          Manage your job postings and recruitment pipeline.
        </p>
      </div>

      <JobToolbar
        search={search}
        setSearch={setSearch}
      />

      <JobFilters
        status={status}
        setStatus={setStatus}
        employmentType={employmentType}
        setEmploymentType={setEmploymentType}
      />

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default Jobs;