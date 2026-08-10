import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function RecentApplicants() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export default RecentApplicants;