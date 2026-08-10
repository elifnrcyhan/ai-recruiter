import { Input } from "../ui/input";
import { Search } from "lucide-react";
import CreateJobDialog from "./CreateJobDialog";

function JobToolbar({ search, setSearch }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-10"
          placeholder="Search jobs..."
        />
      </div>

      <CreateJobDialog />
    </div>
  );
}

export default JobToolbar;