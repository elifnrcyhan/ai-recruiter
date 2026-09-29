import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { api } from "../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Textarea } from "../components/ui/textarea";

function ApplicantDetail() {
const { id } = useParams();
const [applicant, setApplicant] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadApplicant = async () => {
    try {
const data = await api.get(`/applications/${id}`);
setApplicant(data);
setStatus(data.status);
    } catch (error) {
      console.error("Failed to load applicant:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadApplicant();
}, [id]);
  const [status, setStatus] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const updateApplicationStatus = async (newStatus) => {
  try {
    const updatedApplication = await api.patch(
      `/applications/${id}/status`,
      {
        status: newStatus,
      }
    );

    setStatus(updatedApplication.status);
    setApplicant((current) => ({
      ...current,
      status: updatedApplication.status,
    }));
  } catch (error) {
    console.error("Failed to update application status:", error);
  }
};

  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" asChild>
        <Link to="/applicants">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applicants
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
           {applicant?.user?.fullName || "Loading..."}
          </h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {applicant?.user?.email || "Loading..."}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Istanbul, Türkiye
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
<div className="flex items-center gap-3">
  <Badge>
    {status}
  </Badge>

<Button onClick={() => updateApplicationStatus("ACCEPTED")}>
  Accept
</Button>

  <Button
  variant="destructive"
  onClick={() => setRejectDialogOpen(true)}
>
  Reject
</Button>
</div>
</div>

        <Badge>
          Shortlisted
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        <Card>
          <CardHeader>
            <CardTitle>AI Match</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {applicant?.aiAnalysis?.score ?? 0}%
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Compatibility with the job
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              3 Years
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Professional experience
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applied Position</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg font-semibold">
              {applicant?.job?.title || "Loading..."}
            </p>
          </CardContent>
        </Card>
      </div>
<Card>
  <CardHeader>
    <CardTitle>AI Analysis</CardTitle>
  </CardHeader>

  <CardContent className="space-y-6">
    <div>
      <p className="text-sm text-muted-foreground">
        AI Compatibility Score
      </p>

      <div className="mt-2 flex items-center gap-4">
        <span className="text-4xl font-bold">
          {applicant?.aiAnalysis?.score ?? 0}%
        </span>

        <Badge>
          Strong Match
        </Badge>
      </div>
    </div>

    <div>
      <h3 className="font-semibold">
        AI Summary
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {applicant?.aiAnalysis?.summary ?? "No AI analysis available."}
      </p>
    </div>

<div>
  <h3 className="font-semibold">
    Strengths
  </h3>

  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
    {applicant?.aiAnalysis?.strengths?.map((strength) => (
      <li key={strength}>{strength}</li>
    ))}
  </ul>
</div>

<div>
  <h3 className="font-semibold">
    Weaknesses
  </h3>

  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
    {applicant?.aiAnalysis?.weaknesses?.map((weakness) => (
      <li key={weakness}>{weakness}</li>
    ))}
  </ul>
</div>

<div>
  <h3 className="font-semibold">
    Missing Skills
  </h3>

  <div className="mt-2 flex flex-wrap gap-2">
    {applicant?.aiAnalysis?.missingSkills?.map((skill) => (
      <Badge key={skill} variant="secondary">
        {skill}
      </Badge>
    ))}
  </div>
</div>
  </CardContent>
</Card>
{status === "Rejected" && rejectReason && (
  <Card>
    <CardHeader>
      <CardTitle>Rejection Reason</CardTitle>
    </CardHeader>

    <CardContent>
      <p className="text-sm text-muted-foreground">
        {rejectReason}
      </p>
    </CardContent>
  </Card>
)}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">JavaScript</Badge>
          <Badge variant="secondary">HTML</Badge>
          <Badge variant="secondary">CSS</Badge>
          <Badge variant="secondary">Git</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <h3 className="font-semibold">
              Frontend Developer
            </h3>

            <p className="text-sm text-muted-foreground">
              2023 - Present
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Developed web applications using React,
              JavaScript and modern frontend technologies.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CV</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            CV preview will be available here.
          </p>
        </CardContent>
      </Card>
      <Dialog
  open={rejectDialogOpen}
  onOpenChange={setRejectDialogOpen}
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Reject Applicant</DialogTitle>

      <DialogDescription>
        Please provide a reason for rejecting this applicant.
      </DialogDescription>
    </DialogHeader>

    <Textarea
      value={rejectReason}
      onChange={(event) =>
        setRejectReason(event.target.value)
      }
      placeholder="Enter rejection reason..."
    />

    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => setRejectDialogOpen(false)}
      >
        Cancel
      </Button>

<Button
  variant="destructive"
  onClick={async () => {
    await updateApplicationStatus("REJECTED");
    setRejectDialogOpen(false);
  }}
>
  Reject Applicant
</Button>
    </div>
  </DialogContent>
</Dialog>
    </div>
    
  );
}


export default ApplicantDetail;