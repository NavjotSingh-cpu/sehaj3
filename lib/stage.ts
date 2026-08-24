import type { ApplicationStage } from "./types";

export const STAGE_LABEL: Record<ApplicationStage, string> = {
  eligibility: "Eligibility check",
  details: "Details submitted",
  documents: "Waiting on documents",
  payment: "Waiting on payment",
  slot: "Ready to book a slot",
  under_review: "With the RTO for review",
  flagged: "Needs your attention",
  confirmed: "Slot booked",
  completed: "Completed",
};

// The order a well-behaved application moves through. Used to render the
// honest timeline — every stage is always shown, never skipped silently.
export const STAGE_ORDER: ApplicationStage[] = [
  "details",
  "documents",
  "payment",
  "under_review",
  "confirmed",
  "completed",
];

export const APPLY_STEPS = [
  { key: "eligibility", label: "Eligibility", href: "/apply/eligibility" },
  { key: "details", label: "Details", href: "/apply/details" },
  { key: "documents", label: "Documents", href: "/apply/documents" },
  { key: "payment", label: "Payment", href: "/apply/payment" },
  { key: "slot", label: "Slot", href: "/apply/slot" },
] as const;
