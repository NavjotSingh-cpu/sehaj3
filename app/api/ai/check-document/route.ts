import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, AI_LIVE } from "@/lib/openai";

interface CheckResult {
  mode: "live" | "simulated";
  passed: boolean;
  issues: string[];
  guidance: string;
}

const SYSTEM_PROMPT = `You are a document pre-checker for an Indian Learner's Licence application, standing in for
an RTO clerk. You are shown either a passport-style photo or a signature image. Check strictly for the same things
an RTO reviewer checks before accepting the document:

For a photo: plain light background, face clearly visible and centred, no sunglasses/cap, no heavy shadow or glare,
not a screenshot of another photo, image not blurry or cropped oddly.

For a signature: a handwritten signature clearly visible on plain paper, not typed text, not a blank or near-blank
image, not a photo of a screen, reasonably legible.

Respond ONLY as JSON: {"passed": boolean, "issues": string[], "guidance": string}. "issues" is empty if passed is
true. "guidance" is one short plain-language sentence telling the applicant exactly what to do next, written for
someone who may not be comfortable with technical language.`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, dataUrl } = body as { type: "photo" | "signature"; dataUrl: string };

  if (!dataUrl || !type) {
    return NextResponse.json({ error: "type and dataUrl are required" }, { status: 400 });
  }

  const openai = getOpenAI();

  if (openai && AI_LIVE()) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: `Document type to check: ${type}` },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
      });
      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw);
      const result: CheckResult = {
        mode: "live",
        passed: Boolean(parsed.passed),
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        guidance: parsed.guidance ?? "Please review the document and try again.",
      };
      return NextResponse.json(result);
    } catch (err) {
      // Fall through to simulated mode rather than breaking the citizen journey.
      return NextResponse.json(simulate(type, true));
    }
  }

  return NextResponse.json(simulate(type, false));
}

function simulate(type: "photo" | "signature", wasLiveErrorFallback: boolean): CheckResult {
  return {
    mode: "simulated",
    passed: true,
    issues: [],
    guidance: wasLiveErrorFallback
      ? "Demo mode: the live AI check could not be reached, so this document was accepted automatically."
      : "Demo mode: document accepted. Add an OPENAI_API_KEY to enable the real AI photo/signature check.",
  };
}
