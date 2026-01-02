import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProfileField {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface ProfileCardProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  status?: string;
  statusType?: "active" | "inactive" | "pending";
  fields: ProfileField[];
  className?: string;
}

const ProfileCard = ({
  name,
  subtitle,
  avatar,
  status,
  statusType = "active",
  fields,
  className,
}: ProfileCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-gradient-to-l from-primary/20 to-primary/5 p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">{name}</h2>
              {status && (
                <Badge variant="outline" className={statusColors[statusType]}>
                  {status}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground">{field.label}</p>
              <p
                className={cn(
                  "text-sm font-medium",
                  field.highlight && "text-primary"
                )}
              >
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
