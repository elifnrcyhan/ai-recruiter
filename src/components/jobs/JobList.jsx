import JobCard from "./JobCard";

function JobList() {
  return (
    <div className="space-y-4">
      <JobCard
        title="Frontend Developer"
        location="Remote"
        type="Full Time"
        applicants={12}
        status="Active"
      />

      <JobCard
        title="Backend Developer"
        location="Hybrid"
        type="Full Time"
        applicants={8}
        status="Active"
      />

      <JobCard
        title="UI/UX Designer"
        location="Remote"
        type="Contract"
        applicants={5}
        status="Closed"
      />
    </div>
  );
}

export default JobList;