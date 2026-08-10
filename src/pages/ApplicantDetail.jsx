import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
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
  const [status, setStatus] = useState("Shortlisted");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
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
            John Doe
          </h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              john@example.com
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

  <Button onClick={() => setStatus("Accepted")}>
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
              92%
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
              Frontend Developer
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
          92%
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
        The candidate has strong frontend development
        experience and matches most of the technical
        requirements for this position.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Strengths
      </h3>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li>Strong React experience</li>
        <li>Good JavaScript knowledge</li>
        <li>Professional frontend experience</li>
        <li>Experience with Git</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold">
        Weaknesses
      </h3>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li>Limited backend experience</li>
        <li>No experience with Docker</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold">
        Missing Skills
      </h3>

      <div className="mt-2 flex flex-wrap gap-2">
        <Badge variant="secondary">
          Node.js
        </Badge>

        <Badge variant="secondary">
          Docker
        </Badge>
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
        onClick={() => {
          setStatus("Rejected");
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