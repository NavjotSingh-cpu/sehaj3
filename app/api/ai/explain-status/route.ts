import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, AI_LIVE } from "@/lib/openai";
import type { Application } from "@/lib/types";

const SYSTEM_PROMPT = `You are the "Application Advocate" inside Sahaj, an independent hackathon prototype that
rethinks the Parivahan Learner's Licence journey. A citizen is looking at their application and does not
understand what is happening. You are given the full application record as JSON (documents, payments, timeline,
flags, stage). Your job is the opposite of a call-centre script that repeats "your application is under process":

- Say exactly what stage the application is at, in plain language.
- If something needs the citizen's action, say precisely what and why, citing the specific document or payment
  record that caused it.
- If nothing needs action, say what happens next and roughly when.
- Never tell the citizen to "contact the RTO" unless you have already told them everything you know.
- Keep it to 3-4 short sentences. No jargon, no legal disclaimers, no apology filler.

Respond ONLY as JSON: {"explanation": string, "nextAction": string}.`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const application = body.application as Application;

  if (!application) {
    return NextResponse.json({ error: "application is required" }, { status: 400 });
  }

  const openai = getOpenAI();

  if (openai && AI_LIVE()) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(application) },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
      });
      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw);
      return NextResponse.json({
        mode: "live",
        explanation: parsed.explanation ?? "",
        nextAction: parsed.nextAction ?? "",
      });
    } catch (err) {
      return NextResponse.json(simulate(application));
    }
  }

  return NextResponse.json(simulate(application));
}

function simulate(application: Application) {
  const latestPayment = application.payments[application.payments.length - 1];

  if (application.flags.length > 0) {
    return {
      mode: "simulated" as const,
      explanation: application.flags[0],
      nextAction: "Re-upload the flagged document from your application page. No RTO visit or phone call is needed for this.",
    };
  }

  if (latestPayment?.status === "failed_debited") {
    return {
      mode: "simulated" as const,
      explanation: `₹${latestPayment.amount} was debited but not matched to your application. A refund (ref ${latestPayment.referenceId}) starts automatically within 24 hours.`,
      nextAction: "No action needed. You can also retry the payment now if you'd rather not wait for the refund.",
    };
  }

  const byStage: Record<string, { explanation: string; nextAction: string }> = {
    documents: {
      explanation: "Your details are saved. We're waiting on your photo and signature before this can move forward.",
      nextAction: "Upload both documents to continue.",
    },
    payment: {
      explanation: "Your documents passed the check. We're waiting on payment before this can be sent for RTO review.",
      nextAction: "Complete the payment step to continue.",
    },
    slot: {
      explanation: "Payment is confirmed. Your application is queued for RTO review, which usually takes 1-2 working days.",
      nextAction: "Book your test slot now, or wait for review to finish first — either order works.",
    },
    under_review: {
      explanation: "Everything you've submitted has passed our checks and is with the RTO for final review.",
      nextAction: "No action needed. This step usually takes 1-2 working days.",
    },
    confirmed: {
      explanation: "Your slot is booked and your application is fully in order.",
      nextAction: `Visit ${application.slot?.rtoName ?? "your RTO"} on ${application.slot?.date ?? "your booked date"} with your original documents.`,
    },
    completed: {
      explanation: "This application is complete.",
      nextAction: "No action needed.",
    },
    flagged: {
      explanation: "Something needs your attention, but no specific reason was recorded.",
      nextAction: "Check the flagged item on your application page.",
    },
    eligibility: {
      explanation: "You haven't started this application yet.",
      nextAction: "Continue from where you left off.",
    },
    details: {
      explanation: "Your personal details are saved.",
      nextAction: "Continue to document upload.",
    },
  };

  return {
    mode: "simulated" as const,
    ...(byStage[application.stage] ?? {
      explanation: "We couldn't determine a specific status for this application.",
      nextAction: "Open the application page for full details.",
    }),
  };
}
