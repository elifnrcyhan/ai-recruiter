import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

function JobApplicants() {
  const { id } = useParams();

  const applicants = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      matchRate: 92,
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      matchRate: 86,
      status: "Review",
    },
    {
      id: 3,
      name: "Alex Brown",
      email: "alex@example.com",
      matchRate: 71,
      status: "Rejected",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <Button variant="ghost" asChild>
          <Link to={`/jobs/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          Applicants
        </h1>

        <p className="text-muted-foreground">
          Review candidates for this job.
        </p>
      </div>

      <div className="space-y-4">
        {applicants.map((applicant) => (
          <Card key={applicant.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h2 className="font-semibold">
                  {applicant.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {applicant.email}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  AI Match: {applicant.matchRate}%
                </span>

                <Badge variant="secondary">
                  {applicant.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default JobApplicants;