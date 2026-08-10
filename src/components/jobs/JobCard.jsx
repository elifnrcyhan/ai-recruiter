import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function JobCard({
  id,
  title,
  location,
  type,
  applicants,
  matchRate,
  status,
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            <Badge
              variant={
                status === "Closed"
                  ? "secondary"
                  : "default"
              }
            >
              {status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {location} • {type}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span>
              {applicants} Applicants
            </span>

            <span className="text-muted-foreground">
              AI Match: {matchRate}%
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/jobs/${id}`}>
                 View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit Job
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

export default JobCard;