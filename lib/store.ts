"use client";

import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import type {
  Application,
  Applicant,
  DocumentRecord,
  PaymentRecord,
  Slot,
  Session,
} from "./types";
import { generateReferenceId, nowIso, timelineEntry, seedFlaggedApplication } from "./mock";

// Defense in depth: even with compressed images, a long demo session can
// accumulate several applications' worth of documents. If localStorage ever
// does fill up, fail the *write* silently rather than throwing out of a
// button's click handler and breaking the citizen journey mid-flow.
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch (err) {
      console.warn("Sahaj: could not persist state (storage quota). Continuing in-memory only.", err);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      /* ignore */
    }
  },
};

interface DraftState {
  applicant: Partial<Applicant>;
  documents: DocumentRecord[];
}

interface Store {
  session: Session | null;
  applications: Application[];
  draft: DraftState;

  login: (mobile: string) => void;
  logout: () => void;

  setDraftApplicant: (applicant: Partial<Applicant>) => void;
  addDraftDocument: (doc: DocumentRecord) => void;
  replaceDraftDocument: (type: DocumentRecord["type"], doc: DocumentRecord) => void;

  submitDetails: () => string; // returns new application id
  recordPayment: (appId: string, payment: PaymentRecord) => void;
  bookSlot: (appId: string, slot: Slot) => void;
  fixSignature: (appId: string, doc: DocumentRecord) => void;

  getApplication: (id: string) => Application | undefined;
  ensureDemoApplication: () => void;
  resetAll: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      session: null,
      applications: [],
      draft: { applicant: {}, documents: [] },

      login: (mobile) => set({ session: { mobile, loggedInAt: nowIso() } }),
      logout: () => set({ session: null }),

      setDraftApplicant: (applicant) =>
        set((s) => ({ draft: { ...s.draft, applicant: { ...s.draft.applicant, ...applicant } } })),

      addDraftDocument: (doc) =>
        set((s) => ({
          draft: {
            ...s.draft,
            documents: [...s.draft.documents.filter((d) => d.type !== doc.type), doc],
          },
        })),

      replaceDraftDocument: (type, doc) =>
        set((s) => ({
          draft: { ...s.draft, documents: [...s.draft.documents.filter((d) => d.type !== type), doc] },
        })),

      submitDetails: () => {
        const id = generateReferenceId();
        const { draft } = get();
        const applicant: Applicant = {
          fullName: draft.applicant.fullName ?? "",
          dob: draft.applicant.dob ?? "",
          guardianName: draft.applicant.guardianName ?? "",
          mobile: get().session?.mobile ?? "",
          address: draft.applicant.address ?? "",
          bloodGroup: draft.applicant.bloodGroup ?? "",
        };
        const application: Application = {
          id,
          serviceType: "Learner's Licence",
          applicant,
          stage: "documents",
          documents: draft.documents,
          payments: [],
          slot: null,
          flags: [],
          timeline: [
            timelineEntry("details", "Details submitted", "Personal details recorded and validated."),
          ],
          createdAt: nowIso(),
        };
        set((s) => ({
          applications: [...s.applications, application],
          draft: { applicant: {}, documents: [] },
        }));
        return id;
      },

      recordPayment: (appId, payment) =>
        set((s) => ({
          applications: s.applications.map((a) => {
            if (a.id !== appId) return a;
            const nextStage =
              payment.status === "success" ? "slot" : payment.status === "pending_bank_confirmation" ? "payment" : "payment";
            const flags =
              payment.status === "failed_debited"
                ? [
                    `₹${payment.amount} was debited from your account but the application was not charged. A refund has been started automatically (ref ${payment.referenceId}). You do not need to call anyone or pay again.`,
                  ]
                : a.flags;
            return {
              ...a,
              payments: [...a.payments, payment],
              stage: nextStage,
              flags,
              timeline: [
                ...a.timeline,
                timelineEntry(
                  "payment",
                  payment.status === "success"
                    ? "Payment received"
                    : payment.status === "pending_bank_confirmation"
                    ? "Payment being confirmed by your bank"
                    : "Payment issue detected",
                  payment.note
                ),
              ],
            };
          }),
        })),

      bookSlot: (appId, slot) =>
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === appId
              ? {
                  ...a,
                  slot,
                  stage: "confirmed",
                  timeline: [
                    ...a.timeline,
                    timelineEntry(
                      "slot",
                      "Slot booked",
                      `${slot.date} at ${slot.time}, ${slot.rtoName}.`
                    ),
                  ],
                }
              : a
          ),
        })),

      fixSignature: (appId, doc) =>
        set((s) => ({
          applications: s.applications.map((a) => {
            if (a.id !== appId) return a;
            const passed = doc.check?.passed ?? false;
            return {
              ...a,
              documents: [...a.documents.filter((d) => d.type !== "signature"), doc],
              stage: passed ? "under_review" : "flagged",
              flags: passed ? [] : a.flags,
              timeline: [
                ...a.timeline,
                timelineEntry(
                  passed ? "under_review" : "flagged",
                  passed ? "Signature re-checked: passed" : "Signature re-checked: still an issue",
                  doc.check?.guidance ?? ""
                ),
              ],
            };
          }),
        })),

      getApplication: (id) => get().applications.find((a) => a.id === id),

      ensureDemoApplication: () => {
        const exists = get().applications.some((a) => a.id === "LL-2026-4471209");
        if (!exists) {
          set((s) => ({ applications: [seedFlaggedApplication(), ...s.applications] }));
        }
      },

      resetAll: () => set({ session: null, applications: [], draft: { applicant: {}, documents: [] } }),
    }),
    { name: "sahaj-store", storage: createJSONStorage(() => safeStorage) }
  )
);
