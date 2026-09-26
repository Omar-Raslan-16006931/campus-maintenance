"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type RequestCategory,
} from "@/lib/requests";

const ALL = "all";

export function CategoryFilter({ value }: { value?: RequestCategory }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="category-filter"
        className="text-sm text-muted-foreground"
      >
        Category
      </label>
      <Select
        value={value ?? ALL}
        onValueChange={(next) =>
          router.push(next === ALL ? "/requests" : `/requests?category=${next}`)
        }
      >
        <SelectTrigger id="category-filter" className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
