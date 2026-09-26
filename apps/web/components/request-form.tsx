"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApiError,
  CATEGORIES,
  CATEGORY_LABELS,
  createRequest,
  isRequestCategory,
  type CreateRequestInput,
  type MaintenanceRequest,
} from "@/lib/requests";

type Field = keyof CreateRequestInput;
type FieldErrors = Partial<Record<Field, string>>;

const FIELDS: Field[] = ["title", "description", "location", "category"];

type FormValues = {
  title: string;
  description: string;
  location: string;
  category: string;
};

const EMPTY: FormValues = {
  title: "",
  description: "",
  location: "",
  category: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim())
    errors.description = "Description is required.";
  if (!values.location.trim()) errors.location = "Location is required.";
  if (!isRequestCategory(values.category))
    errors.category = "Choose a category.";
  return errors;
}

/** Maps NestJS ValidationPipe messages ("title should not be empty") to fields. */
function mapApiErrors(messages: string[]): {
  fields: FieldErrors;
  other: string[];
} {
  const fields: FieldErrors = {};
  const other: string[] = [];
  for (const msg of messages) {
    const field = FIELDS.find((f) => msg.startsWith(`${f} `));
    if (field && !fields[field]) fields[field] = msg;
    else if (!field) other.push(msg);
  }
  return { fields, other };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function RequestForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<MaintenanceRequest | null>(null);

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;
    if (!isRequestCategory(values.category)) return;

    setSubmitting(true);
    try {
      const request = await createRequest({
        title: values.title.trim(),
        description: values.description.trim(),
        location: values.location.trim(),
        category: values.category,
      });
      setCreated(request);
      setValues(EMPTY);
    } catch (err) {
      if (err instanceof ApiError) {
        const { fields, other } = mapApiErrors(err.messages);
        setErrors(fields);
        setFormError(
          other.length
            ? other.join(" ")
            : err.status >= 500
              ? "The server had a problem. Try again."
              : null,
        );
      } else {
        setFormError(
          "Could not reach the API. Is the backend running on port 3001?",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-status-resolved" aria-hidden />
            Request reported
          </CardTitle>
          <CardDescription>
            &ldquo;{created.title}&rdquo; was saved with status{" "}
            <strong>{created.status}</strong>.
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-3">
          <Button onClick={() => setCreated(null)}>Report another</Button>
          <Button asChild variant="outline">
            <Link href="/requests">View all requests</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a maintenance problem</CardTitle>
        <CardDescription>
          All fields are required. New requests start as open.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={onSubmit}
        noValidate
        aria-label="Report a maintenance problem"
      >
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Broken projector"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            <FieldError id="title-error" message={errors.title} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="e.g. The projector does not turn on since Monday."
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              className="placeholder:text-muted-foreground border-input dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm"
            />
            <FieldError id="description-error" message={errors.description} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={values.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Building C, room 3.201"
                aria-invalid={!!errors.location}
                aria-describedby={
                  errors.location ? "location-error" : undefined
                }
              />
              <FieldError id="location-error" message={errors.location} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={values.category}
                onValueChange={(v) => update("category", v)}
              >
                <SelectTrigger
                  id="category"
                  className="w-full"
                  aria-invalid={!!errors.category}
                  aria-describedby={
                    errors.category ? "category-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="category-error" message={errors.category} />
            </div>
          </div>

          {formError && (
            <p
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {formError}
            </p>
          )}
        </CardContent>
        <CardFooter className="mt-6">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
