import type { components } from "./api-types";
import { API_URL } from "./api";

export type RequestCategory = components["schemas"]["RequestCategory"];
export type RequestStatus = components["schemas"]["RequestStatus"];
export type CreateRequestInput = components["schemas"]["CreateRequestDto"];
export type MaintenanceRequest =
  components["schemas"]["MaintenanceRequestResponseDto"];

/** Every category from the API contract, with a display label. */
export const CATEGORY_LABELS: Record<RequestCategory, string> = {
  equipment: "Equipment",
  electrical: "Electrical",
  plumbing: "Plumbing",
  facility: "Facility",
  other: "Other",
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as RequestCategory[];

export function isRequestCategory(value: unknown): value is RequestCategory {
  return typeof value === "string" && value in CATEGORY_LABELS;
}

/** Error thrown when the API answers with a non-2xx status. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly messages: string[],
  ) {
    super(messages.join(", ") || `Request failed with status ${status}`);
  }
}

type NestErrorBody = { message?: string | string[] };

async function toApiError(res: Response): Promise<ApiError> {
  let body: NestErrorBody = {};
  try {
    body = (await res.json()) as NestErrorBody;
  } catch {
    // Non-JSON error body: fall back to the status code only.
  }
  const messages = Array.isArray(body.message)
    ? body.message
    : body.message
      ? [body.message]
      : [];
  return new ApiError(res.status, messages);
}

export async function createRequest(
  input: CreateRequestInput,
): Promise<MaintenanceRequest> {
  const res = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw await toApiError(res);
  return (await res.json()) as MaintenanceRequest;
}

export async function listRequests(
  category?: RequestCategory,
): Promise<MaintenanceRequest[]> {
  const url = new URL("/requests", API_URL);
  if (category) url.searchParams.set("category", category);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw await toApiError(res);
  return (await res.json()) as MaintenanceRequest[];
}
