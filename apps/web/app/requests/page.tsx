import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/category-filter";
import { RequestCard } from "@/components/request-card";
import {
  CATEGORY_LABELS,
  isRequestCategory,
  listRequests,
  type MaintenanceRequest,
} from "@/lib/requests";

export const metadata: Metadata = {
  title: "Requests · Campus Maintenance",
};

export default async function RequestsPage({
  searchParams,
}: PageProps<"/requests">) {
  const { category: raw } = await searchParams;
  const category = isRequestCategory(raw) ? raw : undefined;

  let requests: MaintenanceRequest[] = [];
  let loadError: string | null = null;
  try {
    requests = await listRequests(category);
  } catch {
    loadError =
      "Could not load requests. Make sure the API is running on port 3001.";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Maintenance requests
          </h1>
          <p className="text-sm text-muted-foreground">
            {category
              ? `Showing ${CATEGORY_LABELS[category].toLowerCase()} requests`
              : "Showing all requests"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CategoryFilter value={category} />
          <Button asChild>
            <Link href="/requests/new">Report a problem</Link>
          </Button>
        </div>
      </div>

      {loadError ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {loadError}
        </p>
      ) : requests.length === 0 ? (
        <p className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
          No requests {category ? "in this category " : ""}yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3" aria-label="Maintenance requests">
          {requests.map((r) => (
            <li key={r._id}>
              <RequestCard request={r} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
