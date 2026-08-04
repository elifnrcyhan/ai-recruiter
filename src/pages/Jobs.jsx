import JobToolbar from "../components/jobs/JobToolbar";
import JobList from "../components/jobs/JobList";

function Jobs() {
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

      <JobToolbar />

      <JobList />
    </div>
  );
}

export default Jobs;