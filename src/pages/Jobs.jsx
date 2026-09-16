import { useEffect, useMemo, useState } from "react";

import JobToolbar from "../components/jobs/JobToolbar";
import JobList from "../components/jobs/JobList";
import JobFilters from "../components/jobs/JobFilters";
import { api } from "../services/api";

function Jobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");

const [jobs, setJobs] = useState([]);

useEffect(() => {
  const loadJobs = async () => {
    try {
      const data = await api.get("/jobs");
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  loadJobs();
}, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
  status === "all" ||
  (status === "active" && job.isActive === true) ||
  (status === "closed" && job.isActive === false);

const matchesType =
  employmentType === "all" ||
  job.employmentType.toLowerCase().replace(" ", "-") === employmentType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [jobs,search, status, employmentType]);

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