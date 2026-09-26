import type { Metadata } from "next";
import { RequestForm } from "@/components/request-form";

export const metadata: Metadata = {
  title: "Report a problem · Campus Maintenance",
};

export default function NewRequestPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <RequestForm />
    </div>
  );
}
