import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Something broken on campus?
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Report maintenance problems, see what has already been reported, and
          mark requests as resolved once they are fixed.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/requests/new">Report a problem</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/requests">Browse requests</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Report</CardTitle>
            <CardDescription>
              Title, description, location and category.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Browse &amp; filter</CardTitle>
            <CardDescription>
              See every request, filter by category.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolve</CardTitle>
            <CardDescription>Mark fixed problems as resolved.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
