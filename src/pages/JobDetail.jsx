import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { api } from "../services/api";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicantCount, setApplicantCount] = useState(0);
  
useEffect(() => {
  const loadJob = async () => {
    try {
      const data = await api.get(`/jobs/${id}`);
      setJob(data);

      const applicationData = await api.get(
        `/applications/job/${id}/count`
      );

      setApplicantCount(applicationData.count);
    } catch (error) {
      console.error("Failed to load job:", error);
    }
  };

  loadJob();
}, [id]);

  if (!job) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }
  return (
    <div className="space-y-6 p-6">
      <div>
        <Button variant="ghost" asChild>
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
                {job.title}
            </h1>

            <Badge>
              {job.isActive ? "Active" : "Closed"}
            </Badge>
          </div>

          <p className="mt-2 text-muted-foreground">
            {job.location} • {job.employmentType}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {applicantCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Match Rate</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              86%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg">
              {job.experience || "Not specified"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
                {job.description}
          </p>
        </CardContent>
      </Card>

<Card className="transition-shadow hover:shadow-md">
  <CardHeader>
    <CardTitle>Applicants</CardTitle>
  </CardHeader>

  <CardContent>
    <Link
      to={`/jobs/${id}/applicants`}
      className="block"
    >
      <p className="text-3xl font-bold">
        {applicantCount}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        View applicants
      </p>
    </Link>
  </CardContent>
</Card>
    </div>
  );
}

export default JobDetail;