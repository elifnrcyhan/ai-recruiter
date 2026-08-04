import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


function CreateJobDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </DialogTrigger>

<DialogContent className="sm:max-w-[600px]">
  <DialogHeader>
    <DialogTitle>Create Job</DialogTitle>

    <DialogDescription>
      Create a new job posting for candidates.
    </DialogDescription>
  </DialogHeader>

  <div className="grid gap-4 py-4">

    <div className="grid gap-2">
      <Label htmlFor="title">Job Title</Label>
      <Input id="title" placeholder="Frontend Developer" />
    </div>

    <div className="grid gap-2">
      <Label htmlFor="department">Department</Label>
      <Input id="department" placeholder="Software Development" />
    </div>

    <div className="grid gap-2">
      <Label htmlFor="location">Location</Label>
      <Input id="location" placeholder="Remote" />
    </div>

    <div className="grid grid-cols-2 gap-4">

      <div className="grid gap-2">
        <Label>Employment Type</Label>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="full-time">
              Full Time
            </SelectItem>

            <SelectItem value="part-time">
              Part Time
            </SelectItem>

            <SelectItem value="internship">
              Internship
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Experience</Label>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="junior">
              Junior
            </SelectItem>

            <SelectItem value="mid">
              Mid
            </SelectItem>

            <SelectItem value="senior">
              Senior
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>

    <div className="grid gap-2">
      <Label>Description</Label>

      <Textarea
        placeholder="Write job description..."
      />
    </div>

  </div>

  <DialogFooter>
    <Button>Create Job</Button>
  </DialogFooter>
</DialogContent>
    </Dialog>
  );
}

export default CreateJobDialog;