import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function ApplicantFilters({
  status,
  setStatus,
  matchRate,
  setMatchRate,
}) {
  return (
    <div className="flex items-center gap-3">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="shortlisted">
            Shortlisted
          </SelectItem>
          <SelectItem value="review">
            Review
          </SelectItem>
          <SelectItem value="rejected">
            Rejected
          </SelectItem>
          <SelectItem value="accepted">
            Accepted
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={matchRate}
        onValueChange={setMatchRate}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="AI Match" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Match Rates
          </SelectItem>
          <SelectItem value="90">
            90%+
          </SelectItem>
          <SelectItem value="80">
            80%+
          </SelectItem>
          <SelectItem value="70">
            70%+
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ApplicantFilters;