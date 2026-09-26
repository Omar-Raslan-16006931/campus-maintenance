import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { CATEGORY_LABELS, type MaintenanceRequest } from "@/lib/requests";

export function RequestCard({ request }: { request: MaintenanceRequest }) {
  return (
    <Card data-testid="request-card" className="gap-3 py-4">
      <CardHeader className="px-4">
        <CardTitle>{request.title}</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {request.location}
          </span>
          <Badge variant="secondary">{CATEGORY_LABELS[request.category]}</Badge>
        </CardDescription>
        <CardAction>
          <StatusBadge status={request.status} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
