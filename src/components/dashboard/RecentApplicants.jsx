import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { api } from "../../services/api";

function RecentApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await api.get(
          "/applications/company/recent"
        );

        setApplications(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Failed to load recent applicants:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex min-h-[180px] items-center justify-center">
            Loading...
          </div>
        ) : applications.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <h3 className="font-semibold">
                No recent applicants
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Applicants will appear here once candidates apply.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {application.user.fullName}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {application.user.email}
                  </p>
                </div>

                <p className="text-sm font-medium">
                  {application.job.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentApplicants;