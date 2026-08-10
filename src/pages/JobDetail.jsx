import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function JobDetail() {
  const { id } = useParams();

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
              Frontend Developer
            </h1>

            <Badge>Active</Badge>
          </div>

          <p className="mt-2 text-muted-foreground">
            Remote • Full Time
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
              12
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
              Mid Level
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
            We are looking for a Frontend Developer to
            join our software development team. The
            candidate will work with React and modern
            frontend technologies to build scalable
            applications.
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
        12
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