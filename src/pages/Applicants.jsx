import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import ApplicantFilters from "../components/applicants/ApplicantFilters";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

function Applicants() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [matchRate, setMatchRate] = useState("all");

const [applicants, setApplicants] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
  


const filteredApplicants = applicants.filter((applicant) => {
  const matchesSearch = applicant.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    status === "all" ||
    applicant.status.toLowerCase() === status;

  const matchesMatchRate =
    matchRate === "all" ||
    applicant.matchRate >= Number(matchRate);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesMatchRate
  );
});


  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Applicants
        </h1>

        <p className="text-muted-foreground">
          Review and manage job applicants.
        </p>
      </div>

      <div className="relative w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search applicants..."
          className="pl-10"
        />
      </div>
      <ApplicantFilters
  status={status}
  setStatus={setStatus}
  matchRate={matchRate}
  setMatchRate={setMatchRate}
/>

<div className="space-y-4">
  {filteredApplicants.length === 0 ? (
    <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          No applicants found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search or filter settings.
        </p>
      </div>
    </div>
  ) : (
    filteredApplicants.map((applicant) => (
      <Card key={applicant.id}>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <Link
              to={`/applicant/${applicant.id}`}
              className="font-semibold hover:underline"
            >
              {applicant.name}
            </Link>

            <p className="text-sm text-muted-foreground">
              {applicant.email}
            </p>

            <p className="text-sm text-muted-foreground">
              {applicant.position} • {applicant.experience}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                AI Match
              </p>

              <p className="text-lg font-bold">
                {applicant.matchRate}%
              </p>
            </div>

            <Badge variant="secondary">
              {applicant.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    ))
  )}
</div>
    </div>
  );
}

export default Applicants;