import JobCard from "./JobCard";

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            No jobs found
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filter settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          location={job.location}
          type={job.type}
          applicants={job.applicants}
          matchRate={job.matchRate}
          status={job.status}
        />
      ))}
    </div>
  );
}

export default JobList;