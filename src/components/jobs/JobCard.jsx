import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

function JobCard({
  title,
  location,
  type,
  applicants,
  status,
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {location} • {type}
          </p>

          <p className="text-sm">
            {applicants} Applicants
          </p>
        </div>

        <Badge>{status}</Badge>
      </CardContent>
    </Card>
  );
}

export default JobCard;