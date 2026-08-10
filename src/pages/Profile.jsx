import { useState } from "react";
import { User, Mail, BriefcaseBusiness } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleSave = () => {
    // Backend bağlantısı yapıldığında
    // profil güncelleme API isteği burada olacak.
  };

  if (loading) {
    return <LoadingState message="Loading profile..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          setError(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>

            <div>
              <h2 className="font-semibold">
                {profile?.name ?? "Profile"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {profile?.role ?? "User"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Full Name
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  className="pl-10"
                  value={profile?.name ?? ""}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={profile?.email ?? ""}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">
                Role
              </Label>

              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="role"
                  className="pl-10"
                  value={profile?.role ?? ""}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                  placeholder="Your role"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!profile}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;