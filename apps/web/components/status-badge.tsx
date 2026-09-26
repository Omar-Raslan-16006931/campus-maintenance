import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RequestStatus } from "@/lib/requests";

const STYLES: Record<RequestStatus, string> = {
  open: "bg-status-open/20 text-status-open-foreground border-status-open/50",
  resolved:
    "bg-status-resolved/20 text-status-resolved-foreground border-status-resolved/50",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", STYLES[status])}>
      {status}
    </Badge>
  );
}
