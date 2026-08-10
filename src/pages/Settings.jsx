import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

function Settings() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [aiAnalysis, setAiAnalysis] =
    useState(true);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Manage your application preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>

          <CardDescription>
            Configure how you receive notifications.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>
                Email Notifications
              </Label>

              <p className="text-sm text-muted-foreground">
                Receive notifications about applicants
                and recruitment activity.
              </p>
            </div>

            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Recruitment</CardTitle>

          <CardDescription>
            Configure AI-powered recruitment features.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>
                AI Candidate Analysis
              </Label>

              <p className="text-sm text-muted-foreground">
                Automatically analyze CVs when candidates
                apply.
              </p>
            </div>

            <Switch
              checked={aiAnalysis}
              onCheckedChange={setAiAnalysis}
            />
          </div>

          <div className="grid gap-2">
            <Label>
              Minimum AI Match Score
            </Label>

            <Select defaultValue="70">
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="50">
                  50%
                </SelectItem>

                <SelectItem value="60">
                  60%
                </SelectItem>

                <SelectItem value="70">
                  70%
                </SelectItem>

                <SelectItem value="80">
                  80%
                </SelectItem>

                <SelectItem value="90">
                  90%
                </SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
              Candidates below this score can be
              automatically flagged for review.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Preferences</CardTitle>

          <CardDescription>
            General application settings.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label>
              Default Employment Type
            </Label>

            <Select defaultValue="full-time">
              <SelectTrigger className="w-[220px]">
                <SelectValue />
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

                <SelectItem value="contract">
                  Contract
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;