import { Avatar, AvatarFallback, AvatarImage } from "@/modules/ui-components/shadcn/ui/avatar";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui-components/shadcn/ui/card";
import { User, Mail, Calendar, PenSquare } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { User as UserTypes } from "@prisma/client";

interface UserDetailsProps {
  user: UserTypes;
  isCurrentUser: boolean;
}

export function UserDetails({ user, isCurrentUser }: UserDetailsProps) {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Profile</CardTitle>
          {isCurrentUser && (
            <Link href={`/user/${user.id}/edit`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PenSquare className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* AVATAR */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-2xl">{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            {/* ONLINE STATUS */}
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                user.online ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <Badge variant="outline" className="mt-2">
            {user.role}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {format(new Date(user.createdAt), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
