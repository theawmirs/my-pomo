import { Avatar, AvatarFallback, AvatarImage } from "@/modules/ui-components/shadcn/ui/avatar";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui-components/shadcn/ui/card";
import { User, Mail, Calendar, PenSquare } from "lucide-react";
import Link from "next/link";

interface UserDetailsProps {
  user: any;
  isCurrentUser: boolean;
}

const UserDetails = ({ user, isCurrentUser }: UserDetailsProps) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Profile</CardTitle>
          {isCurrentUser && (
            <Link href={`/settings`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PenSquare className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-2xl">{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
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
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
