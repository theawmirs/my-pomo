import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function UserPrivateProfile() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <LockKeyhole className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle>Private Profile</CardTitle>
          <CardDescription>This user's profile is set to private</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>The user has chosen to keep their profile information private.</p>
            <p>You need to be logged in and have permission to view this profile.</p>
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
