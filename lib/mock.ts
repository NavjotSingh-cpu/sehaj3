import type { Application, TimelineEntry } from "./types";

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000000 + Math.random() * 8999999);
  return `LL-${year}-${rand}`;
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function timelineEntry(
  stage: TimelineEntry["stage"],
  label: string,
  detail: string
): TimelineEntry {
  return { stage, at: nowIso(), label, detail };
}

// A pre-flagged demo application so a judge can see the Application Advocate
// in action immediately, without stepping through the full apply flow first.
export function seedFlaggedApplication(): Application {
  const created = new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString();
  return {
    id: "LL-2026-4471209",
    serviceType: "Learner's Licence",
    applicant: {
      fullName: "Ramandeep Kaur",
      dob: "2006-03-14",
      guardianName: "Balwinder Singh",
      mobile: "98XXXXXX21",
      address: "Model Town, Patiala, Punjab",
      bloodGroup: "B+",
    },
    stage: "flagged",
    documents: [
      {
        id: "doc-photo-1",
        type: "photo",
        fileName: "photo.jpg",
        dataUrl: "",
        check: {
          mode: "simulated",
          passed: true,
          issues: [],
          guidance: "Photo meets requirements.",
          checkedAt: created,
        },
      },
      {
        id: "doc-sign-1",
        type: "signature",
        fileName: "signature.jpg",
        dataUrl: "",
        check: {
          mode: "simulated",
          passed: false,
          issues: [
            "Signature not detected inside the marked box",
            "Image appears to be a photo of a screen, not a scan",
          ],
          guidance:
            "Sign inside the printed box on plain white paper, then photograph it straight-on in good light.",
          checkedAt: created,
        },
      },
    ],
    payments: [
      {
        id: "pay-1",
        amount: 350,
        method: "upi",
        status: "success",
        createdAt: created,
        updatedAt: created,
        referenceId: "PAY-8827311",
        note: "Payment received and matched to this application.",
      },
    ],
    slot: null,
    flags: [
      "Signature document did not pass the pre-check. This is why the RTO has not moved your application forward.",
    ],
    timeline: [
      timelineEntry("details", "Details submitted", "Personal details recorded."),
      timelineEntry("documents", "Documents uploaded", "Photo passed. Signature needs to be redone."),
      timelineEntry("payment", "Payment received", "₹350 received, matched to application LL-2026-4471209."),
      timelineEntry(
        "flagged",
        "Action needed from you",
        "Your signature photo did not pass the automatic check. Re-upload it to continue."
      ),
    ],
    createdAt: created,
  };
}
