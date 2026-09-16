import { useState } from "react";
import { api } from "../../services/api";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const handleCreateJob = async () => {
  try {
    const newJob = await api.post("/jobs", {
      title,
      description,
      location,
      employmentType,
      department,
      experience,
    });

    console.log("Job created:", newJob);
  } catch (error) {
    console.error("Failed to create job:", error);
  }
};
  return (
    <Dialog>
<DialogTrigger>
  Create Job
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
     <Input
  id="title"
  placeholder="Frontend Developer"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
    </div>

    <div className="grid gap-2">
      <Label htmlFor="department">Department</Label>
      <Input
  id="department"
  placeholder="Engineering"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>
    </div>

    <div className="grid gap-2">
      <Label htmlFor="location">Location</Label>
      <Input
  id="location"
  placeholder="Remote"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
    </div>

    <div className="grid grid-cols-2 gap-4">

      <div className="grid gap-2">
        <Label>Employment Type</Label>

        <Select
  value={employmentType}
  onValueChange={setEmploymentType}
>
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

<Select
  value={experience}
  onValueChange={setExperience}
>

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
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
    </div>

  </div>

<DialogFooter>
  <Button onClick={handleCreateJob}>
    Create Job
  </Button>
</DialogFooter>
</DialogContent>
    </Dialog>
  );
}

export default CreateJobDialog;