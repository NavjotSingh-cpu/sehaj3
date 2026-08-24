import { NextRequest, NextResponse } from "next/server";
import type { PaymentRecord, PaymentStatus } from "@/lib/types";

function refId(prefix: string) {
  return `${prefix}-${Math.floor(1000000 + Math.random() * 8999999)}`;
}

export async function POST(req: NextRequest) {
  const { amount, method, demoOutcome } = (await req.json()) as {
    amount: number;
    method: "upi" | "card" | "netbanking";
    demoOutcome: "success" | "pending" | "failed_debited";
  };

  // Simulate realistic network/bank latency instead of an instant response.
  await new Promise((r) => setTimeout(r, 900));

  const now = new Date().toISOString();
  const map: Record<string, { status: PaymentStatus; note: string }> = {
    success: {
      status: "success",
      note: `₹${amount} received via ${method.toUpperCase()} and matched to your application immediately.`,
    },
    pending: {
      status: "pending_bank_confirmation",
      note: `₹${amount} sent to your bank for confirmation. This page will update automatically — most banks confirm within 2 minutes, never more than 30.`,
    },
    failed_debited: {
      status: "failed_debited",
      note: `₹${amount} was debited from your account, but your bank did not confirm it to us. A refund has been started automatically — you do not need to raise a complaint or call the helpline.`,
    },
  };

  const outcome = map[demoOutcome] ?? map.success;

  const record: PaymentRecord = {
    id: refId("PAY"),
    amount,
    method,
    status: outcome.status,
    createdAt: now,
    updatedAt: now,
    referenceId: refId("PAY"),
    note: outcome.note,
  };

  return NextResponse.json(record);
}
