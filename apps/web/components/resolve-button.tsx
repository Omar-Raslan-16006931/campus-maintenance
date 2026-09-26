"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError, resolveRequest } from "@/lib/requests";

export function ResolveButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setPending(true);
    try {
      await resolveRequest(id);
      startTransition(() => router.refresh());
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError("This request no longer exists.");
        startTransition(() => router.refresh());
      } else {
        setError("Could not mark as resolved. Try again.");
      }
    } finally {
      setPending(false);
    }
  }

  const busy = pending || refreshing;

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        size="sm"
        variant="outline"
        onClick={onClick}
        disabled={busy}
        aria-label={`Mark "${title}" as resolved`}
      >
        <Check aria-hidden />
        {busy ? "Resolving…" : "Mark resolved"}
      </Button>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
