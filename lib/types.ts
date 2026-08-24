export type ApplicationStage =
  | "eligibility"
  | "details"
  | "documents"
  | "payment"
  | "slot"
  | "under_review"
  | "flagged"
  | "confirmed"
  | "completed";

export type PaymentStatus =
  | "success"
  | "pending_bank_confirmation"
  | "failed_debited"
  | "refund_initiated"
  | "refunded";

export interface PaymentRecord {
  id: string;
  amount: number;
  method: "upi" | "card" | "netbanking";
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  referenceId: string; // shown to citizen, always present, never lost
  note: string; // plain-language, always populated -- never blank
}

export type DocumentType = "photo" | "signature";

export interface DocumentCheck {
  mode: "live" | "simulated"; // live = real OpenAI vision call, simulated = no API key set
  passed: boolean;
  issues: string[];
  guidance: string;
  checkedAt: string;
}

export interface DocumentRecord {
  id: string;
  type: DocumentType;
  fileName: string;
  dataUrl: string; // base64, kept in browser only -- never sent anywhere but our own mock API
  check: DocumentCheck | null;
}

export interface TimelineEntry {
  stage: ApplicationStage;
  at: string;
  label: string;
  detail: string;
}

export interface Slot {
  date: string;
  time: string;
  rtoName: string;
}

export interface Applicant {
  fullName: string;
  dob: string;
  guardianName: string;
  mobile: string;
  address: string;
  bloodGroup: string;
}

export interface Application {
  id: string; // human-facing reference number
  serviceType: "Learner's Licence";
  applicant: Applicant;
  stage: ApplicationStage;
  timeline: TimelineEntry[];
  documents: DocumentRecord[];
  payments: PaymentRecord[];
  slot: Slot | null;
  flags: string[]; // plain-language reasons the application needs citizen action
  createdAt: string;
}

export interface Session {
  mobile: string;
  loggedInAt: string;
}
